import React from 'react';
import PropTypes from 'prop-types';

import InfoBox, { icons } from './InfoBox';

const CompanyInfoBox = ({
  companyId,
  initEditCompany,
  firebase,
  auth,
  ...rest
}) => {
  const deleteCompany = () => {
    firebase.ref(`/users/${auth.uid}/companies/${companyId}`).remove();
  };

  return (
    <InfoBox
      icon={icons.company}
      onEdit={() => initEditCompany(companyId)}
      onDelete={deleteCompany}
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
