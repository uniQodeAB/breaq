import React from 'react';

import InfoBox, { icons } from './InfoBox';

const EmployeeInfoBox = ({
  companyId,
  employeeId,
  initEditEmployee,
  firebase,
  auth,
  ...rest
}) => {
  const deleteEmployee = () => {
    firebase
      .ref(`/users/${auth.uid}/companies/${companyId}/employees/${employeeId}`)
      .remove();
  };

  return (
    <InfoBox
      icon={icons.employee}
      onEdit={() => initEditEmployee(companyId, employeeId)}
      onDelete={deleteEmployee}
      {...rest}
    />
  );
};

export default EmployeeInfoBox;
