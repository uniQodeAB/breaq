import React from 'react';
import PropTypes from 'prop-types';

import '../styles/CompanyLegend.css';

const CompanyLegend = ({ companies, showCompany, hideCompany }) => (
  <div className={'CompanyLegend'}>
    {companies.map(company => (
      <div key={company.id} style={{ background: `${company.color}` }}>
        <input
          name={company.id}
          type={'checkbox'}
          defaultChecked
          onChange={event => {
            if (event.target.checked) {
              showCompany(company.id);
            } else {
              hideCompany(company.id);
            }
          }}
        />
        {company.name}
      </div>
    ))}
  </div>
);

CompanyLegend.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape()),
  showCompany: PropTypes.func.isRequired,
  hideCompany: PropTypes.func.isRequired
};

CompanyLegend.defaultProps = {
  companies: {}
};

export default CompanyLegend;
