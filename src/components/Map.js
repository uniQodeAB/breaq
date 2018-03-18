import React from 'react';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';

const getCompanies = (data, filter, auth) =>
  Object.values(((data.users || {})[auth.uid] || {}).companies || {})
    .map(value => value)
    .filter(company => !filter.includes(company.id)) || [];

const getEmployees = (data, filter) =>
  Object.keys(data)
    .filter(propertyName => propertyName.indexOf('employees') === 0)
    .filter(propertyName => !!data[propertyName])
    .reduce((acc, property) => {
      Object.values(data[property]).forEach(value => {
        acc.push(value);
      });
      return acc;
    }, [])
    .filter(employee => !filter.includes(employee.belongsToCompany)) || [];

const createMarkers = entities =>
  entities.map(entity => (
    <Marker key={entity.id} position={entity.location} label={entity.label} />
  ));

const Map = ({ data, filter, auth }) => {
  const companies = getCompanies(data, filter, auth);
  const employees = getEmployees(data, filter);

  const companyMarkers = createMarkers(companies);
  const employeeMarkers = createMarkers(employees);

  return <MapComponent>{companyMarkers.concat(employeeMarkers)}</MapComponent>;
};

Map.propTypes = {
  data: PropTypes.shape().isRequired,
  filter: PropTypes.arrayOf(PropTypes.string),
  auth: PropTypes.shape().isRequired
};

Map.defaultProps = {
  companies: {},
  filter: []
};

export default Map;
