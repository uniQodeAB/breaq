import React from 'react';
import PropTypes from 'prop-types';

import '../styles/EmployeeGrid.css';
import EmployeeInfoBox from '../containers/EmployeeInfoBoxContainer';

const EmployeeGrid = ({ companyId, employees, active, color }) => (
  <div className={'EmployeeGrid'}>
    <div className={`overlay ${active ? 'active' : 'inactive'}`} />
    <div className={'employee-grid'}>
      {employees.map(employee => (
        <EmployeeInfoBox
          key={employee.id}
          companyId={companyId}
          employeeId={employee.id}
          title={employee.name}
          subTitle={employee.project}
          address={employee.address}
          color={color}
        />
      ))}
    </div>
  </div>
);

EmployeeGrid.propTypes = {
  companyId: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      project: PropTypes.string,
      address: PropTypes.shape({
        streetAddress: PropTypes.string,
        postalAddress: PropTypes.string,
        prefecture: PropTypes.string,
        country: PropTypes.string
      })
    })
  ).isRequired,
  active: PropTypes.bool,
  color: PropTypes.string.isRequired
};

EmployeeGrid.defaultProps = {
  active: false
};

export default EmployeeGrid;
