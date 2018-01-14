import React from 'react';

import PropTypes from 'prop-types';

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
  const createBase = position => {
    const address = createAddress(position);

    return {
      name: position.name,
      address,
      location: {
        lat: position.geometry.location.lat(),
        lng: position.geometry.location.lng()
      }
    };
  };

  const setBase = position => {
    const formatedBase = createBase(position);

    firebase
      .set(`/users/${auth.uid}/base`, formatedBase)
      .then(() => cancelEdit());
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

BaseAddressBox.propTypes = {
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  base: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.shape(),
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }),
  initEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  editMode: PropTypes.bool
};

BaseAddressBox.defaultProps = {
  base: {},
  editMode: false
};

export default BaseAddressBox;
