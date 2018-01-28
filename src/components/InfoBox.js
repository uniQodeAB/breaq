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
              <button onClick={onEdit} className={'button-edit'}>
                <i className={'fas fa-edit'} />
              </button>
            )}

            {onAdd && (
              <button onClick={onAdd} className={'button-employee'}>
                <i className={'fas fa-user-plus'} />
              </button>
            )}

            {onDelete && (
              <button onClick={onDelete} className={'button-delete'}>
                <i className={'fas fa-trash-alt button-delete'} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={'info-content'}>
        <div className={'info-container'}>
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

export const CompanyInfoBox = ({
  companyId,
  initEditCompany,
  addEmployee,
  deleteCompany,
  ...rest
}) => (
  <InfoBox
    icon={icons.company}
    onEdit={() => initEditCompany(companyId)}
    onDelete={() => deleteCompany(companyId)}
    onAdd={() => addEmployee(companyId)}
    {...rest}
  />
);

export const EmployeeInfoBox = ({
  companyId,
  employeeId,
  deleteEmployee,
  initEditEmployee,
  ...rest
}) => (
  <InfoBox
    icon={icons.employee}
    onEdit={() => initEditEmployee(companyId, employeeId)}
    onDelete={() => deleteEmployee(companyId, employeeId)}
    {...rest}
  />
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
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  color: PropTypes.string
};

InfoBox.defaultProps = {
  subTitle: '',
  title: '',
  icon: 'fa-user',
  address: {},
  onEdit: undefined,
  onDelete: undefined,
  onAdd: undefined,
  color: ''
};

CompanyInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  initEditCompany: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired
};

EmployeeInfoBox.propTypes = {
  companyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
  initEditEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
};

export default InfoBox;
