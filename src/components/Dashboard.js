import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import CompanyList from '../containers/CompanyListContainer';
import CompanyCreator from '../containers/CompanyCreatorContainer';
import Button from './Button';

import '../styles/Dashboard.css';

const DashBoard = ({ user, addCompany, initAddCompany }) => {
  if (!isLoaded(user)) {
    return <div className={'Dashboard'}>Loading...</div>;
  }

  return (
    <div className={'Dashboard'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <div>
            {addCompany ? (
              <CompanyCreator />
            ) : (
              <Button onClick={initAddCompany}>Add company</Button>
            )}
            <CompanyList />
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <MapContainer />
      </div>
    </div>
  );
};

DashBoard.propTypes = {
  user: PropTypes.shape(),
  addCompany: PropTypes.bool,
  initAddCompany: PropTypes.func.isRequired
};

DashBoard.defaultProps = {
  user: {},
  addCompany: false
};

export default DashBoard;
