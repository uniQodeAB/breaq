import React from 'react';

import AddressBoxContainer from '../containers/AddressBoxContainer';

const BaseAddressBox = ({ firebase, auth, cancelEdit }) => {
  const deleteBase = () => {
    firebase
      .ref(`/users/${auth.uid}/base`)
      .remove()
      .then(() => cancelEdit());
  };

  return <AddressBoxContainer onDelete={deleteBase} />;
};

export default BaseAddressBox;
