import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Marker } from 'react-google-maps';
import { push } from 'react-router-redux';
import { firebaseConnect } from 'react-redux-firebase';
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

const RegisterPage = ({
  settings,
  setBase,
  firebase,
  auth,
  changeRoute,
  setUsrAtBase,
  setUsrAddress,
  showUsrAddress
}) => {
  const { base } = settings;

  const renderMarker = base => {
    return !_.isEmpty(base) && <Marker position={base.location} />;
  };

  return (
    <div className={'RegisterPage'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <SearchAndAddress onChangePlace={setBase} address={base} />

          <UserBase
            setUserAtBase={setUsrAtBase}
            setUserAddress={setUsrAddress}
            showUserAddress={showUsrAddress}
            settings={settings}
          />

          <ConditionalButton
            firebase={firebase}
            auth={auth}
            onSuccess={changeRoute}
            base={base}
          />
        </div>
      </div>
      <div className={'map-pane'}>
        <MapComponent center={base.location}>{renderMarker(base)}</MapComponent>
      </div>
    </div>
  );
};

const SearchAndAddress = ({ onChangePlace, address, icon }) => (
  <div>
    <div className={'search-box'}>
      <SearchBox onChangePlace={onChangePlace} />
    </div>
    <Address address={address} icon={icon} />
  </div>
);

const UserBase = ({
  settings,
  setUserAtBase,
  showUserAddress,
  setUserAddress
}) => {
  const isSelected = typeof settings.isUserAtBase !== 'undefined';

  return (
    <div>
      {!_.isEmpty(settings.base) && (
        <div>
          <button
            className={
              isSelected && settings.isUserAtBase ? 'active' : 'inactive'
            }
            onClick={() => {
              setUserAtBase();
            }}
          >
            Base
          </button>
          <button
            className={
              isSelected && !settings.isUserAtBase ? 'active' : 'inactive'
            }
            onClick={() => {
              showUserAddress();
            }}
          >
            Other
          </button>

          {isSelected &&
            !settings.isUserAtBase && (
              <SearchAndAddress
                onChangePlace={setUserAddress}
                address={settings.userAddress}
                icon={'USER'}
              />
            )}
        </div>
      )}
    </div>
  );
};

const Address = ({ address, icon }) => {
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
      {address &&
        address.name && (
          <div className={'wrapper'}>
            <div className={'side'}>
              <i className={`fa ${iconClass}`} aria-hidden={'true'} />
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
        )}
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
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterPage);
