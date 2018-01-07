import React from 'react';

import AddressBox from './AddressBox';

const BaseAddressBox = ({ firebase, auth, base, initEdit, cancelEdit }) => {
  const deleteBase = () => {
    firebase
      .ref(`/users/${auth.uid}/base`)
      .remove()
      .then(() => cancelEdit());
  };

  return <AddressBox location={base} onDelete={deleteBase} onEdit={initEdit} />;
};

export default BaseAddressBox;
