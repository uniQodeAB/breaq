import React from 'react';
import PropTypes from 'prop-types';

import InfoBox, { icons } from './InfoBox';

const CompanyInfoBox = ({
  companyId,
  initEditCompany,
  firebase,
  auth,
  addEmployee,
  ...rest
}) => {
  const deleteCompany = () => {
    firebase.ref(`/users/${auth.uid}/companies/${companyId}`).remove();
  };

  console.log(rest);

  return (
    <InfoBox
      icon={icons.company}
      onEdit={() => initEditCompany(companyId)}
      onDelete={deleteCompany}
      onAdd={() => addEmployee(companyId)}
      {...rest}
    />
  );
};

CompanyInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  initEditCompany: PropTypes.func.isRequired,
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};

export default CompanyInfoBox;
