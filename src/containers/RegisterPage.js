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
  setUserAtBase,
  editHomeBase,
  cancelEditHomeBase
} from '../actions/settingsActions';

import './RegisterPage.css';

const RegisterPage = ({ user, firebase, auth, onEdit, editMode, onCancel }) => {
  const renderMarker = position => {
    return !_.isEmpty(position) && <Marker position={position.location} />;
  };

  const onSetBase = position => {
    const base = createBase(position);

    firebase
      .set(`/users/${auth.uid}/settings`, {
        ...base,
        location: {
          lat: base.location.lat(),
          lng: base.location.lng()
        }
      })
      .then(() => onCancel());
  };

  const createBase = position => {
    return {
      htmlAddress: position.adr_address,
      formattedAddress: position.formatted_address,
      location: position.geometry.location,
      name: position.name
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
                {// Enable edit mode if settings are empty
                isEmpty(user.settings) && onEdit()}

                {editMode && (
                  <div>
                    <SearchBox onChangePlace={onSetBase} />
                    {editMode && (
                      <button
                        onClick={() => {
                          onCancel();
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}

                {!isEmpty(user.settings) && (
                  <AddressBox
                    address={user.settings}
                    onEdit={onEdit}
                    onDelete={onDeleteBase}
                  />
                )}
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

const AddressBox = ({ address, icon, onEdit, onDelete }) => {
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
          <div>
            <i className={`fas ${iconClass}`} aria-hidden={'true'} />
          </div>
          <div>
            <button
              onClick={() => {
                onEdit();
              }}
            >
              <i className={'fas fa-edit'} />
            </button>
            <button
              onClick={() => {
                onDelete(address);
              }}
            >
              <i className={'fas fa-trash-alt'} />
            </button>
          </div>
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
