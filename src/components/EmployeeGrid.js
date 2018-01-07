import React from 'react';

import './EmployeeGrid.css';
import AddressBox from './AddressBox';
import { isEmpty } from 'react-redux-firebase';

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

export default EmployeeGrid;
