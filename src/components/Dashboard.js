import React from 'react';

import { Marker } from 'react-google-maps';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import MapComponent from '../components/MapComponent';

import './Dashboard.css';
import HomeBaseBox from './HomeBaseBox';
import AddEmployeeContainer from '../containers/AddEmployeeContainer';

import createAddress from '../address';

const DashBoard = ({
  user,
  firebase,
  auth,
  cancelEditHomeBase,
  initAdd,
  cancelAdd,
  addMode
}) => {
  const renderMarker = position => {
    return !isEmpty(position) && <Marker position={position.location} />;
  };

  const onSetBase = position => {
    const base = createBase(position);

    firebase
      .set(`/users/${auth.uid}/base`, base)
      .then(() => cancelEditHomeBase());
  };

  const createBase = position => {
    const address = createAddress(position);

    return {
      name: position.name,
      address: address,
      location: {
        lat: position['geometry'].location.lat(),
        lng: position['geometry'].location.lng()
      }
    };
  };

  return (
    <div className={'Dashboard'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <div>
            {!isLoaded(user) ? (
              'Loading...'
            ) : (
              <div>
                <HomeBaseBox onChangePlace={onSetBase} />
                <AddEmployeeContainer />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <MapComponent
          center={
            isLoaded(user) && !isEmpty(user.base)
              ? user.base.location
              : undefined
          }
        >
          {!isEmpty(user) && renderMarker(user.base)}
        </MapComponent>
      </div>
    </div>
  );
};

export default DashBoard;
