import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EditorSearchBox, EditorButtons, EditorInput } from './Editor';
import InfoBox, { icons } from './InfoBox';

import '../styles/Editor.css';

const initialState = {
  employee: {
    name: '',
    project: ''
  }
};
/* eslint-disable camelcase */
class EmployeeCreator extends Component {
  constructor(props) {
    super(props);

    const { employee, employeeId } = props;

    if (employee && employeeId) {
      this.state = {
        employee: {
          ...employee,
          id: employeeId
        }
      };
    } else {
      this.state = {
        ...initialState
      };
    }
  }

  render() {
    const {
      placeholders,
      companyId,
      employeeId,
      addEmployee,
      updateEmployee,
      endAddEmployee,
      endEditEmployee,
      color,
      test
    } = this.props;

    const { employee } = this.state;

    return (
      <div className={'Editor'}>
        <EditorInput
          placeholder={placeholders.name}
          value={employee.name}
          onChange={e =>
            this.setState({
              employee: {
                ...employee,
                name: e.target.value
              }
            })
          }
        />

        <EditorInput
          placeholder={placeholders.project}
          value={employee.project}
          onChange={e =>
            this.setState({
              employee: {
                ...employee,
                project: e.target.value
              }
            })
          }
        />

        <EditorSearchBox
          placeholder="Employee address"
          addressCallback={address => {
            this.setState({
              employee: {
                ...employee,
                address: address.address,
                location: address.location
              }
            });
          }}
        />

        <InfoBox
          title={employee.name}
          subTitle={employee.project}
          icon={icons.employee}
          address={employee.address}
          color={color}
        />

        <EditorButtons
          isUpdate={!!employeeId}
          onCancelUpdate={() => endEditEmployee(companyId, employeeId)}
          onUpdate={() => updateEmployee(companyId, employee)}
          onCancelAdd={() => endAddEmployee(companyId)}
          onAdd={() => addEmployee(companyId, employee)}
        />
      </div>
    );
  }
}

EmployeeCreator.propTypes = {
  companyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string,
  employee: PropTypes.shape({
    name: PropTypes.string,
    project: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    })
  }),
  placeholders: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    project: PropTypes.string
  }),
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  endAddEmployee: PropTypes.func.isRequired,
  endEditEmployee: PropTypes.func.isRequired
};

EmployeeCreator.defaultProps = {
  employeeId: undefined,
  employee: undefined,
  placeholders: {
    name: 'Name',
    address: 'Address',
    project: 'Project'
  }
};

export default EmployeeCreator;
