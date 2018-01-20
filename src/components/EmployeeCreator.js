import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';
import './CompanyCreator.css';
import InfoBox, { icons } from './InfoBox';

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

    this.state = {
      ...initialState
    };
  }

  render() {
    const {
      placeholders,
      firebase,
      auth,
      companyId,
      employeeId,
      endAddEmployee
    } = this.props;

    const { employee } = this.state;

    const createEmployee = () => {
      firebase
        .push(`/users/${auth.uid}/companies/${companyId}/employees/`, {
          ...employee
        })
        .then(() => {
          this.setState({
            ...initialState
          });
        })
        .then(endAddEmployee);
    };

    const updateEmployee = () => {
      firebase
        .ref(
          `/users/${auth.uid}/companies/${companyId}/employees/${employeeId}`
        )
        .update(`/users/${auth.uid}/companies/`, {
          ...employee
        })
        .then(() => {
          this.setState({
            ...initialState
          });
        });
    };

    return (
      <div className={'CompanyCreator'}>
        <input
          type={'text'}
          className={'form-input'}
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

        <input
          type={'text'}
          className={'form-input'}
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

        <SearchBox
          placeholder={placeholders.address}
          onChangePlace={(
            {
              street_number = { longName: '' },
              route = { longName: '' },
              postal_code = { longName: '' },
              postal_town = { longName: '' },
              administrative_area_level_1 = { longName: '' },
              country = { longName: '' }
            },
            geometry = { location: {} }
          ) => {
            this.setState({
              employee: {
                ...employee,
                address: {
                  streetAddress: `${street_number.longName} ${route.longName}`,
                  postalAddress: `${postal_code.longName} ${
                    postal_town.longName
                  }`,
                  prefecture: administrative_area_level_1.longName,
                  country: country.longName
                },
                location: {
                  lat: geometry.location ? geometry.location.lat() : {},
                  lng: geometry.location ? geometry.location.lng() : {}
                }
              }
            });
          }}
        />

        {(employee.name || employee.project || employee.address) && (
          <InfoBox
            title={employee.name}
            subTitle={employee.project}
            id={'temp'}
            icon={icons.employee}
            address={employee.address}
          />
        )}

        <div className={'buttons'}>
          <button onClick={endAddEmployee}>Cancel</button>
          <button className={'add'} onClick={createEmployee}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

EmployeeCreator.propTypes = {
  companyId: PropTypes.string.isRequired,
  placeholders: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    project: PropTypes.string
  }),
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};

EmployeeCreator.defaultProps = {
  company: {},
  placeholders: {
    name: 'Name',
    address: 'Address',
    project: 'Project'
  }
};

export default EmployeeCreator;
