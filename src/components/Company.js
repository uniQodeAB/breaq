import React from 'react';
import PropTypes from 'prop-types';
import EmployeeGrid from './EmployeeGrid';
import CompanyInfoBox from '../containers/CompanyInfoBoxContainer';
import EmployeeCreator from '../containers/EmployeeCreatorContainer';
import Button from './Button';
import CompanyCreator from '../containers/CompanyCreatorContainer';

import '../styles/Company.css';

const Company = ({
  company: { id, name, address, employees, color },
  editCompany,
  addEmployee,
  initAddEmployee,
  editEmployee,
  editEmployeeId
}) => (
  <div className={'Company'} style={{ background: `${color}` }}>
    <div className={'company'}>
      {editCompany ? (
        <CompanyCreator companyId={id} />
      ) : (
        <CompanyInfoBox companyId={id} title={name} address={address} />
      )}
    </div>
    <div className={'employees'}>
      <div>
        {addEmployee || editEmployee ? (
          <EmployeeCreator companyId={id} employeeId={editEmployeeId} />
        ) : (
          <div>
            <Button onClick={() => initAddEmployee(id)}>Add employee</Button>
            <EmployeeGrid
              companyId={id}
              employees={
                employees
                  ? Object.entries(employees).reduce(
                      (a, [employeeId, employee]) => {
                        a.push({
                          id: employeeId,
                          ...employee
                        });
                        return a;
                      },
                      []
                    )
                  : []
              }
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

Company.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired
  }).isRequired,
  editCompany: PropTypes.bool,
  addEmployee: PropTypes.bool,
  editEmployee: PropTypes.bool,
  editEmployeeId: PropTypes.string,
  initAddEmployee: PropTypes.func.isRequired
};

Company.defaultProps = {
  editCompany: false,
  addEmployee: false,
  editEmployee: false,
  editEmployeeId: ''
};

export default Company;
