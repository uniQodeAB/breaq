import React from 'react';
import PropTypes from 'prop-types';
import './InfoBox.css';

export const icons = {
  employee: 'fa-user',
  company: 'fa-home'
};

const InfoBox = ({ id, title, subTitle, address, icon, onEdit, onDelete }) => (
  /* const { name, project } = location;

  const address = Object.entries(location.address).reduce((a, [k, v]) => {
    const addr = { ...a };
    addr[k] = v.longName;
    return addr;
  }, {}); */

  <div className={'InfoBox'}>
    <div className={'wrapper'}>
      <div className={'side-wrapper'}>
        <div className={'side'}>
          <div className={'icon'}>
            <i className={`fas ${icon}`} aria-hidden={'true'} />
          </div>
          <div className={'controls'}>
            {onEdit && (
              <button onClick={() => onEdit(id)}>
                <i className={'fas fa-edit'} />
              </button>
            )}

            {onDelete && (
              <button onClick={() => onDelete(id)}>
                <i className={'fas fa-trash-alt'} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={'content'}>
        <div className={'container'}>
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
          <p>{address.streetAddress}</p>
          <p>{address.postalAddress}</p>
          <p>{address.prefecture}</p>
          <p>{address.country}</p>
        </div>
      </div>
    </div>
  </div>
);

InfoBox.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  address: PropTypes.shape({
    streetAddress: PropTypes.string,
    postalAddress: PropTypes.string,
    prefecture: PropTypes.string,
    country: PropTypes.string
  }),
  icon: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

InfoBox.defaultProps = {
  subTitle: '',
  title: '',
  icon: 'fa-user',
  address: {},
  onEdit: undefined,
  onDelete: undefined
};

export default InfoBox;
