import React from 'react';
import PropTypes from 'prop-types';
import EmployeeGrid from './EmployeeGrid';
import CompanyInfoBox from '../containers/CompanyInfoBoxContainer';
import EmployeeCreator from '../containers/EmployeeCreatorContainer';
import Button from './Button';
import CompanyCreator from '../containers/CompanyCreatorContainer';

import './Company.css';

const Company = ({
  company: { id, name, address, employees },
  editCompany,
  addEmployee,
  initAddEmployee,
  editEmployee,
  editEmployeeId
}) => (
  <div className={'Company'}>
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
                employees &&
                Object.entries(employees).reduce(
                  (a, [employeeId, employee]) => {
                    a.push({
                      id: employeeId,
                      ...employee
                    });
                    return a;
                  },
                  []
                )
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
    company: PropTypes.shape({
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
    })
  })
};

Company.defaultProps = {
  company: {}
};

export default Company;
