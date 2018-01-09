import React from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import MapComponent from './MapComponent';
import { Marker } from 'react-google-maps';

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

  return (
    <MapComponent center={base}>{renderMarkers(base, employees)}</MapComponent>
  );
};

export default Map;
