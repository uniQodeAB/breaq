import React from 'react';

import './EmployeeGrid.css';
import AddressBox from './AddressBox';
import { isEmpty } from 'react-redux-firebase';

const EmployeeGrid = ({ employees }) => (
  <div className={'EmployeeGrid'}>
    {!isEmpty(employees) &&
      Object.entries(employees).map(([k, v]) => (
        <AddressBox key={k} location={v} icon={'USER'} />
      ))}
  </div>
);

export default EmployeeGrid;
