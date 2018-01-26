import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import CompanyList from '../containers/CompanyListContainer';
import CompanyEditor from '../containers/CompanyEditorContainer';
import Button from './Button';

import '../styles/Dashboard.css';
import CompanyLegendContainer from '../containers/CompanyLegendContainer';

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
              <CompanyEditor />
            ) : (
              <Button onClick={initAddCompany}>
                <i className={'fas fa-plus'} />
              </Button>
            )}
            <CompanyList />
          </div>
        </div>
      </div>
      <div className={'map-pane'}>
        <CompanyLegendContainer />
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
