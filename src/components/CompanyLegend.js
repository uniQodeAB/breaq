import React from 'react';
import PropTypes from 'prop-types';

import '../styles/CompanyLegend.css';

const CompanyLegend = ({ companies, showCompany, hideCompany }) => (
  <div className={'CompanyLegend'}>
    {Object.entries(companies)
      .reduce((a, [id, company]) => {
        if (id !== 'undefined') {
          a.push({
            id,
            ...company
          });
        }
        return a;
      }, [])
      .reverse()
      .map(company => (
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
  companies: PropTypes.shape(),
  showCompany: PropTypes.func.isRequired,
  hideCompany: PropTypes.func.isRequired
};

CompanyLegend.defaultProps = {
  companies: {}
};

export default CompanyLegend;
