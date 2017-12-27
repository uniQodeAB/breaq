import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Marker } from 'react-google-maps';
import { push } from 'react-router-redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import SearchBox from '../components/SearchBox';
import MapComponent from '../components/MapComponent';
import {
  setHomeBase,
  setUserAddress,
  showUserAddress,
  setUserAtBase
} from '../actions/settingsActions';

import './RegisterPage.css';

const RegisterPage = ({ user, firebase, auth }) => {
  console.log({ firebase });

  const renderMarker = position => {
    return !_.isEmpty(position) && <Marker position={position.location} />;
  };

  const onSetBase = position => {
    const base = createBase(position);

    firebase.set(`/users/${auth.uid}/settings`, {
      ...base,
      location: {
        lat: base.location.lat(),
        lng: base.location.lng()
      }
    });
  };

  const createBase = position => {
    return {
      htmlAddress: position.adr_address,
      formattedAddress: position.formatted_address,
      location: position.geometry.location,
      name: position.name
    };
  };

  return (
    <div className={'RegisterPage'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <div>
            {!isLoaded(user) ? (
              'Loading...'
            ) : user && user.settings ? (
              <AddressBox address={user.settings} />
            ) : (
              <SearchBox onChangePlace={onSetBase} />
            )}
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <MapComponent center={!isEmpty(user) && user.settings.location}>
          {!isEmpty(user) && renderMarker(user.settings)}
        </MapComponent>
      </div>
    </div>
  );
};

const AddressBox = ({ address, icon }) => {
  let iconClass;

  switch (icon) {
    case 'BASE':
      iconClass = 'fa-home';
      break;
    case 'USER':
      iconClass = 'fa-user';
      break;
    default:
      iconClass = 'fa-home';
  }

  return (
    <div className={'Address'}>
      <div className={'wrapper'}>
        <div className={'side'}>
          <i className={`fas ${iconClass}`} aria-hidden={'true'} />
        </div>
        <div className={'content'}>
          <div
            className={'container'}
            dangerouslySetInnerHTML={{
              __html: address.htmlAddress.split(',').join('')
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ConditionalButton = ({ firebase, onSuccess, auth, base }) =>
  !_.isEmpty(base) && (
    <button
      onClick={() => {
        firebase
          .set(`/users/${auth.uid}/settings`, {
            ...base,
            location: {
              lat: base.location.lat(),
              lng: base.location.lng()
            }
          })
          .then(() => {
            onSuccess('/dashboard');
          });
      }}
    >
      Save
    </button>
  );

function mapStateToProps(state) {
  return {
    settings: state.settings,
    auth: state.firebase.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBase: location => dispatch(setHomeBase(location)),
    changeRoute: path => dispatch(push(path)),
    setUsrAtBase: () => dispatch(setUserAtBase()),
    setUsrAddress: location => dispatch(setUserAddress(location)),
    showUsrAddress: () => dispatch(showUserAddress())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/settings`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    user: data.users && data.users[auth.uid],
    auth: auth
  }))
)(RegisterPage);
