import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import CompanyList from '../containers/CompanyListContainer';
import CompanyEditor from '../containers/CompanyEditorContainer';
import Button from './Button';

import '../styles/Dashboard.css';
import CompanyLegend from '../containers/CompanyLegendContainer';

const DashBoard = ({ user, addCompany, initAddCompany }) => {
  if (!isLoaded(user)) {
    return <div className={'Dashboard'}>Loading...</div>;
  }

  return (
    <div className={'Dashboard'}>
      <div className={'container'}>
        <div className={'grid sidebar'}>
          <div className={'add-company'}>
            {addCompany ? (
              <CompanyEditor />
            ) : (
              <Button onClick={initAddCompany}>
                <i className={'fas fa-plus'} />
              </Button>
            )}
          </div>
          <CompanyList />
        </div>
        <div className={'grid content'}>
          <MapContainer />
          <div className={'grid extra'}>
            <CompanyLegend />
          </div>
        </div>
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
