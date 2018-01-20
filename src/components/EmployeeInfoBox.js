import React from 'react';
import PropTypes from 'prop-types';

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

EmployeeInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
  initEditEmployee: PropTypes.func.isRequired,
  firebase: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired
};

export default EmployeeInfoBox;
