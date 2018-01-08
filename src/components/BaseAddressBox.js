import React from 'react';

import AddressBox from './AddressBox';
import SearchBox from './SearchBox';
import createAddress from '../address';

const BaseAddressBox = ({
  firebase,
  auth,
  base,
  initEdit,
  cancelEdit,
  editMode
}) => {
  const setBase = position => {
    const base = createBase(position);

    firebase.set(`/users/${auth.uid}/base`, base).then(() => cancelEdit());
  };

  const createBase = position => {
    const address = createAddress(position);

    return {
      name: position.name,
      address: address,
      location: {
        lat: position['geometry'].location.lat(),
        lng: position['geometry'].location.lng()
      }
    };
  };

  const deleteBase = () => {
    firebase
      .ref(`/users/${auth.uid}/base`)
      .remove()
      .then(() => cancelEdit());
  };

  return (
    <div>
      {(editMode || !base) && (
        <div>
          <SearchBox
            onChangePlace={setBase}
            placeholder={'Where is your home base?'}
          />

          {editMode && <button onClick={() => cancelEdit()}>Cancel</button>}
        </div>
      )}

      <AddressBox
        id={'base'}
        location={base}
        onDelete={deleteBase}
        onEdit={initEdit}
      />
    </div>
  );
};

export default BaseAddressBox;
