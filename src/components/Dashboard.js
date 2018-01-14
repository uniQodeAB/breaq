import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import MapContainer from '../containers/MapContainer';
import './Dashboard.css';
import AddEmployeeContainer from '../containers/AddEditEmployeeContainer';
import EmployeeGridContainer from '../containers/EmployeeGridContainer';
import BaseAddressBoxContainer from '../containers/BaseAddressBoxContainer';

const DashBoard = ({ user }) => (
  <div className={'Dashboard'}>
    <div className={'search-box-pane'}>
      <div className={'search-container'}>
        <div>
          {!isLoaded(user) ? (
            'Loading...'
          ) : (
            <div>
              <BaseAddressBoxContainer />
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

DashBoard.propTypes = {
  user: PropTypes.shape
};

DashBoard.defaultProps = {
  user: {}
};

export default DashBoard;
