import React from 'react';
import PropTypes from 'prop-types';
import '../styles/InfoBox.css';

export const icons = {
  employee: 'fa-user',
  company: 'fa-home'
};

const InfoBox = ({
  title,
  subTitle,
  address,
  icon,
  onEdit,
  onDelete,
  onAdd,
  color
}) => (
  <div className={'InfoBox'}>
    <div className={'wrapper'}>
      <div className={'side-wrapper'}>
        <div className={'side'} style={{ background: `${color}` }}>
          <div className={'icon'}>
            <i className={`fas ${icon}`} aria-hidden={'true'} />
          </div>
          <div className={'controls'}>
            {onEdit && (
              <button onClick={onEdit}>
                <i className={'fas fa-edit'} />
              </button>
            )}

            {onDelete && (
              <button onClick={onDelete} className={'button-delete'}>
                <i className={'fas fa-trash-alt button-delete'} />
              </button>
            )}

            {onAdd && (
              <button onClick={onAdd} className={'button-employee'}>
                <i className={'fas fa-user-plus'} />
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
