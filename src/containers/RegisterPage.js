import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Marker } from 'react-google-maps';
import { push } from 'react-router-redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import PositionBox from './PositionBox';

import MapComponent from '../components/MapComponent';
import {
  setHomeBase,
  setUserAddress,
  showUserAddress,
  setUserAtBase,
  editHomeBase,
  cancelEditHomeBase
} from '../actions/settingsActions';

import './RegisterPage.css';

const RegisterPage = ({ user, firebase, auth, onCancel }) => {
  const renderMarker = position => {
    return !_.isEmpty(position) && <Marker position={position.location} />;
  };

  const onSetBase = position => {
    const base = createBase(position);

    firebase.set(`/users/${auth.uid}/settings`, base).then(() => onCancel());
  };

  const createBase = position => {
    const address = position['address_components']
      .map(address => ({
        types: address.types,
        longName: address['long_name'],
        shortName: address['short_name']
      }))
      .reduce((acc, elem) => {
        elem.types.forEach(type => {
          acc[type] = {
            longName: elem.longName,
            shortName: elem.shortName
          };
        });

        return acc;
      }, {});

    return {
      name: position.name,
      address: address,
      location: {
        lat: position['geometry'].location.lat(),
        lng: position['geometry'].location.lng()
      }
    };
  };

  const onDeleteBase = () => {
    firebase
      .ref(`/users/${auth.uid}/settings`)
      .remove()
      .then(() => onCancel());
  };

  return (
    <div className={'RegisterPage'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <div>
            {!isLoaded(user) ? (
              'Loading...'
            ) : (
              <div>
                <PositionBox onChangePlace={onSetBase} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <MapComponent
          center={
            isLoaded(user) && !isEmpty(user.settings)
              ? user.settings.location
              : undefined
          }
        >
          {!isEmpty(user) && renderMarker(user.settings)}
        </MapComponent>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setBase: location => dispatch(setHomeBase(location)),
    changeRoute: path => dispatch(push(path)),
    setUsrAtBase: () => dispatch(setUserAtBase()),
    setUsrAddress: location => dispatch(setUserAddress(location)),
    showUsrAddress: () => dispatch(showUserAddress()),
    onEdit: () => dispatch(editHomeBase()),
    onCancel: () => dispatch(cancelEditHomeBase())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/settings`] : [];
  }),
  connect(
    ({ firebase: { data, auth } }) => ({
      user: data.users && data.users[auth.uid],
      auth: auth
    }),
    mapDispatchToProps
  ),
  connect(state => ({
    editMode: state.settings.editingHomeBase
  }))
)(RegisterPage);
