import React from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';
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

const Map = ({ user, base, employees }) => {
  if (!isLoaded(user)) {
    return 'Loading...';
  }

  return <MapComponent>{renderMarkers(base, employees)}</MapComponent>;
};

Map.propTypes = {
  user: PropTypes.shape.isRequired,
  base: PropTypes.shape,
  employees: PropTypes.arrayOf(PropTypes.shape)
};

Map.defaultProps = {
  base: {},
  employees: []
};

export default Map;
