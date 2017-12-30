import React from 'react';
import PropTypes from 'prop-types';
import './AddressBox.css';

const AddressBox = ({
  location,
  icon,
  initEdit,
  cancelEdit,
  firebase,
  auth
}) => {
  // Do not render if address does not exist
  if (!location) return null;

  let iconClass;

  switch (icon) {
    case 'BASE':
      iconClass = 'fa-home';
      break;
    case 'USER':
      iconClass = 'fa-user';
      break;
    default:
      iconClass = 'fa-home';
  }

  const onDeleteBase = () => {
    firebase
      .ref(`/users/${auth.uid}/settings`)
      .remove()
      .then(() => cancelEdit());
  };

  const name = location.name;
  const address = Object.entries(location.address).reduce((a, [k, v]) => {
    a[k] = v['longName'];
    return a;
  }, {});

  return (
    <div className={'Address'}>
      <div className={'wrapper'}>
        <div className={'side'}>
          <div>
            <i className={`fas ${iconClass}`} aria-hidden={'true'} />
          </div>
          <div>
            <button onClick={initEdit}>
              <i className={'fas fa-edit'} />
            </button>
            <button onClick={() => onDeleteBase()}>
              <i className={'fas fa-trash-alt'} />
            </button>
          </div>
        </div>
        <div className={'content'}>
          <div className={'container'}>
            <h1>{name}</h1>
            <p>
              {address['street_number']} {address['route']}
            </p>
            <p>
              {address['postal_code']} {address['postal_town']}
            </p>
            <p>{address['country']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

AddressBox.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.string,
  initEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired
};

export default AddressBox;
