import React, { Component } from 'react';
import SearchBox from './SearchBox';

import './AddEmployee.css';
import AddressBox from './AddressBox';
import createAddress from '../address';
import _ from 'lodash';

class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      project: '',
      address: {}
    };
  }

  render() {
    const firebase = this.props.firebase;
    const auth = this.props.auth;

    const addEmployee = state => {
      firebase.push(`/users/${auth.uid}/employees`, {
        name: state.name,
        project: state.project,
        address: state.address
      });
    };

    if (!this.state.addMode) {
      return (
        <div className={'AddEmployee'}>
          <button onClick={() => this.setState({ addMode: true })}>Add</button>
        </div>
      );
    }

    return (
      <div className={'AddEmployee'}>
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
              editMode: false
            });
          }}
          placeholder={'Project address'}
        />

        <AddressBox
          location={
            !_.isEmpty(this.state.address)
              ? { address: this.state.address }
              : {}
          }
        />

        <div>
          <button onClick={() => this.setState({ addMode: false })}>
            Cancel
          </button>
          <button onClick={() => addEmployee(this.state)}>Save</button>
        </div>
      </div>
    );
  }
}

export default AddEmployee;
