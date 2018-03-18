import React from 'react';
import PropTypes from 'prop-types';
import Company from '../containers/CompanyContainer';

import '../styles/CompanyList.css';

const CompanyList = ({ companies }) => (
  <div className={'CompanyList'}>
    {companies.map(company => <Company key={company.id} company={company} />)}
  </div>
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape())
};

CompanyList.defaultProps = {
  companies: []
};

export default CompanyList;
