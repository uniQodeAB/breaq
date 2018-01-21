import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';

const Map = ({ companies, filter }) => (
  <MapComponent>
    {isEmpty(companies)
      ? []
      : Object.entries(companies)
          .reduce((a, [id, company]) => {
            a.push({
              id,
              ...company
            });

            return a;
          }, [])
          .filter(company => !filter.includes(company.id))
          .reduce((a, company) => {
            a.push({
              id: company.id,
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
  companies: PropTypes.shape(),
  filter: PropTypes.arrayOf(PropTypes.string)
};

Map.defaultProps = {
  companies: {},
  filter: []
};

export default Map;
