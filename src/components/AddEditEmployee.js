import React, { Component } from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';
import './AddEditEmployee.css';
import AddressBox from './AddressBox';
import createAddress from '../address';

class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      project: '',
      address: {},
      location: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editMode) {
      this.setState({
        editMode: true,
        name: nextProps.employee.name,
        project: nextProps.employee.project,
        address: nextProps.employee.address,
        location: nextProps.employee.location
      });
    }
  }

  render() {
    const {
      firebase,
      auth,
      employeeId,
      addMode,
      editMode,
      initAddEmployee,
      cancelAddEmployee
    } = this.props;

    const addEmployee = () => {
      firebase
        .push(`/users/${auth.uid}/employees`, {
          name: this.state.name,
          project: this.state.project,
          address: this.state.address,
          location: this.state.location
        })
        .then(() => {
          this.setState({
            editMode: true,
            name: '',
            project: '',
            address: {},
            location: {}
          });

          this.props.cancelAddEmployee();
        });
    };

    const editEmployee = id => {
      firebase
        .ref(`/users/${auth.uid}/employees/${id}`)
        .update({
          name: this.state.name,
          project: this.state.project,
          address: this.state.address,
          location: this.state.location
        })
        .then(() => {
          this.setState({
            editMode: true,
            name: '',
            project: '',
            address: {},
            location: {}
          });

          this.props.cancelAddEmployee();
        });
    };

    if (!addMode && !editMode) {
      return (
        <div className={'AddEditEmployee'}>
          <button onClick={() => initAddEmployee()}>Add</button>
        </div>
      );
    }

    return (
      <div className={'AddEditEmployee'}>
        <input
          type={'text'}
          className={'form-input'}
          placeholder={'Name'}
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />

        <input
          type={'text'}
          className={'form-input'}
          placeholder={'Project'}
          value={this.state.project}
          onChange={e => this.setState({ project: e.target.value })}
        />

        <SearchBox
          onChangePlace={position => {
            this.setState({
              address: createAddress(position),
              location: {
                lat: position.geometry.location.lat(),
                lng: position.geometry.location.lng()
              },
              editMode: false
            });
          }}
          placeholder={'Project address'}
        />

        <AddressBox
          id={'temp'}
          icon={'USER'}
          location={
            !_.isEmpty(this.state.address)
              ? { address: this.state.address }
              : {}
          }
        />

        <div className={'buttons'}>
          <button onClick={() => cancelAddEmployee()}>Cancel</button>
          {addMode ? (
            <button onClick={() => addEmployee()}>Save</button>
          ) : (
            <button onClick={() => editEmployee(employeeId)}>Update</button>
          )}
        </div>
      </div>
    );
  }
}

AddEmployee.propTypes = {
  editMode: PropTypes.bool,
  employee: PropTypes.shape({
    name: PropTypes.string,
    project: PropTypes.string,
    address: PropTypes.shape,
    location: PropTypes.shape
  }),
  firebase: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
  employeeId: PropTypes.string,
  addMode: PropTypes.bool,
  initAddEmployee: PropTypes.func.isRequired,
  cancelAddEmployee: PropTypes.func.isRequired
};

AddEmployee.defaultProps = {
  editMode: false,
  employee: {},
  employeeId: '',
  addMode: false
};

export default AddEmployee;
