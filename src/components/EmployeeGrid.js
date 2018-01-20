import React from 'react';
import PropTypes from 'prop-types';

import './EmployeeGrid.css';
import InfoBox, { icons } from './InfoBox';

const EmployeeGrid = ({
  firebase,
  auth,
  employees,
  initEdit,
  cancelEdit,
  active
}) => {
  const deleteEmployee = id => {
    firebase
      .ref(`/users/${auth.uid}/employees/${id}`)
      .remove()
      .then(() => cancelEdit());
  };

  return (
    <div className={'EmployeeGrid'}>
      <div className={`overlay ${active ? 'active' : 'inactive'}`} />
      <div className={'grid'}>
        {employees.map(employee => (
          <InfoBox
            key={employee.id}
            id={employee.id}
            title={employee.name}
            subTitle={employee.project}
            address={employee.address}
            icon={icons.employee}
            onDelete={deleteEmployee}
            onEdit={initEdit}
            addressFields={[
              {
                id: 'street-address',
                name: employee.streetAddress
              },
              {
                id: 'postal-address',
                name: employee.postalAddress
              },
              {
                id: 'prefecture',
                name: employee.prefecture
              },
              {
                id: 'country',
                name: employee.country
              }
            ]}
          />
        ))}
      </div>
    </div>
  );
};

EmployeeGrid.propTypes = {
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
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
  ),
  initEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  active: PropTypes.bool
};

EmployeeGrid.defaultProps = {
  employees: [],
  active: false
};

export default EmployeeGrid;
