import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './AddressBox.css';

const AddressBox = ({ location, icon, initEdit, onDelete }) => {
  // Do not render if address does not exist
  if (_.isEmpty(location)) return null;

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

  console.log(location);

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
            {initEdit && ( //Allow edit if initEdit method exists
              <button onClick={initEdit}>
                <i className={'fas fa-edit'} />
              </button>
            )}

            {onDelete && ( //Allow delete if onDelete method exists
              <button onClick={() => onDelete()}>
                <i className={'fas fa-trash-alt'} />
              </button>
            )}
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
            <p>{address['administrative_area_level_1']}</p>
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
  initEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default AddressBox;
