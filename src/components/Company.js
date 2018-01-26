import React from 'react';
import PropTypes from 'prop-types';
import EmployeeGrid from './EmployeeGrid';
import CompanyInfoBox from '../containers/CompanyInfoBoxContainer';
import EmployeeCreator from '../containers/EmployeeCreatorContainer';
import CompanyEditor from '../containers/CompanyEditorContainer';

import '../styles/Company.css';

const Company = ({
  company: { id, name, address, employees, color },
  editCompany,
  addEmployee,
  editEmployee,
  editEmployeeId
}) => (
  <div className={'Company'}>
    <div className={'company'}>
      {editCompany ? (
        <CompanyEditor companyId={id} />
      ) : (
        <CompanyInfoBox
          companyId={id}
          title={name}
          address={address}
          color={color}
        />
      )}
    </div>
    <div className={'employees'}>
      <div>
        {addEmployee || editEmployee ? (
          <EmployeeCreator
            companyId={id}
            employeeId={editEmployeeId}
            color={color}
          />
        ) : (
          <div>
            <EmployeeGrid
              companyId={id}
              color={color}
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
