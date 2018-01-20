import React, { Component } from 'react';

import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import MapContainer from '../containers/MapContainer';
import './Dashboard.css';
import CompanyList from '../containers/CompanyListContainer';
import CompanyCreator from '../containers/CompanyCreatorContainer';
import Button from './Button';

const DashBoard = ({ user, addCompany, initAddCompany }) => {
  if (!isLoaded(user)) {
    return <div className={'Dashboard'}>Loading...</div>;
  }

  console.log(addCompany);

  return (
    <div className={'Dashboard'}>
      <div className={'search-box-pane'}>
        <div className={'search-container'}>
          <div>
            {addCompany ? (
              <div>
                <CompanyCreator />
              </div>
            ) : (
              <div>
                <Button onClick={initAddCompany}>Add company</Button>
                <CompanyList />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'map-pane'} />
    </div>
  );
};

DashBoard.propTypes = {
  user: PropTypes.shape({
    base: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.shape(),
      location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    })
  })
};

DashBoard.defaultProps = {
  user: {}
};

export default DashBoard;
