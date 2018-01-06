import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import MapContainer from '../containers/MapContainer';

import './Dashboard.css';
import HomeBaseBox from './HomeBaseBox';
import AddEmployeeContainer from '../containers/AddEmployeeContainer';

import createAddress from '../address';
import EmployeeGridContainer from '../containers/EmployeeGridContainer';

const DashBoard = ({ user, firebase, auth, cancelEditHomeBase }) => {
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
                <EmployeeGridContainer />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <MapContainer />
      </div>
    </div>
  );
};

export default DashBoard;
