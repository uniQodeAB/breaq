import React from 'react';

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

export default CompanyInfoBox;
