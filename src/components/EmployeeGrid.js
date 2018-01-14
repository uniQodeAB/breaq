import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import './EmployeeGrid.css';
import AddressBox from './AddressBox';

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
        {!isEmpty(employees) &&
          Object.entries(employees).map(([k, v]) => (
            <AddressBox
              id={k}
              key={k}
              location={v}
              icon={'USER'}
              onDelete={deleteEmployee}
              onEdit={initEdit}
            />
          ))}
      </div>
    </div>
  );
};

EmployeeGrid.propTypes = {
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  employees: PropTypes.shape(),
  initEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  active: PropTypes.bool
};

EmployeeGrid.defaultProps = {
  employees: {},
  active: false
};

export default EmployeeGrid;
