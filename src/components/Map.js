import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';

const renderMarkers = (base, employees) => {
  const markers = [];

  if (!isEmpty(base)) {
    markers.push(<Marker key={'base'} position={base.location} label={'B'} />);
  }

  if (!isEmpty(employees)) {
    Object.entries(employees).forEach(([k, v]) => {
      markers.push(<Marker key={k} position={v.location} />);
    });
  }

  return markers;
};

const Map = ({ companies }) => (
  <MapComponent>
    {isEmpty(companies) ||
      Object.entries(companies)
        .reduce((a, [id, company]) => {
          a.push({
            id,
            location: company.location,
            label: 'B'
          });

          if (company.employees) {
            Object.entries(company.employees).forEach(
              ([employeeId, employee]) => {
                if (employee) {
                  a.push({
                    id: employeeId,
                    location: employee.location
                  });
                }
              }
            );
          }

          return a;
        }, [])
        .map(location => (
          <Marker
            key={location.id}
            position={location.location}
            label={location.label}
          />
        ))}
  </MapComponent>
);

Map.propTypes = {
  base: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.shape(),
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }),
  employees: PropTypes.shape()
};

Map.defaultProps = {
  user: {},
  base: {},
  employees: {}
};

export default Map;
