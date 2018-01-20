import React from 'react';
import PropTypes from 'prop-types';
import EmployeeGrid from './EmployeeGrid';
import InfoBox, { icons } from './InfoBox';
import EmployeeCreator from '../containers/EmployeeCreatorContainer';
import Button from './Button';

const Company = ({
  company: { id, name, address, employees },
  addEmployee,
  initAddEmployee
}) => (
  <div className={'Company'}>
    <div className={'company'}>
      <InfoBox id={id} title={name} address={address} icon={icons.company} />
    </div>
    <div className={'employees'}>
      <div>
        {addEmployee ? (
          <EmployeeCreator companyId={id} />
        ) : (
          <div>
            <Button onClick={initAddEmployee}>Add employee</Button>
            <EmployeeGrid
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
