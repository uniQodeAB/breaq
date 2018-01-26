import React from 'react';
import PropTypes from 'prop-types';

import InfoBox, { icons } from './InfoBox';

const EmployeeInfoBox = ({
  companyId,
  employeeId,
  deleteEmployee,
  initEditEmployee,
  firebase,
  auth,
  ...rest
}) => {
  return (
    <InfoBox
      icon={icons.employee}
      onEdit={() => initEditEmployee(companyId, employeeId)}
      onDelete={() => deleteEmployee(companyId, employeeId)}
      {...rest}
    />
  );
};

EmployeeInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
  initEditEmployee: PropTypes.func.isRequired,
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};

export default EmployeeInfoBox;
