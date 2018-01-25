import React from 'react';
import PropTypes from 'prop-types';

import InfoBox, { icons } from './InfoBox';

const CompanyInfoBox = ({
  companyId,
  initEditCompany,
  addEmployee,
  deleteCompany,
  ...rest
}) => (
  <InfoBox
    icon={icons.company}
    onEdit={() => initEditCompany(companyId)}
    onDelete={() => deleteCompany(companyId)}
    onAdd={() => addEmployee(companyId)}
    {...rest}
  />
);

CompanyInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  initEditCompany: PropTypes.func.isRequired,
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};

export default CompanyInfoBox;
