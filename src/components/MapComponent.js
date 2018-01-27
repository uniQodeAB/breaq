import React, { PureComponent } from 'react';
import { compose, lifecycle, withProps } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import PropTypes from 'prop-types';

import mapStyles from '../styles/mapStyles.json';
import '../styles/MapComponent.css';

/* eslint-disable no-underscore-dangle */
const defaultMapOptions = {
  fullscreenControl: false,
  clickableIcons: false,
  streetViewControl: false,
  styles: mapStyles
};

const fitBounds = (markers, map) => {
  const bounds = new window.google.maps.LatLngBounds();
  markers.forEach(marker => {
    bounds.extend(
      new window.google.maps.LatLng(
        marker.props.position.lat,
        marker.props.position.lng
      )
    );
  });

  map.fitBounds(bounds);

  if (map.getZoom() > 15) {
    map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(15);
  }
};

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_MAP_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div className={'loading-element'} />,
    containerElement: <div className={'MapComponent'} />,
    mapElement: <div className={'map-element'} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        mapRef: refs
      });

      this.setState({
        bounds: null,
        center: {
          lat: 60.09726,
          lng: 19.93481
        },
        onMapMounted: ref => {
          refs.map = ref;
          this.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
            shouldUpdate: false
          });
        },
        onIdle: () => {
          /*
                     * Called to fit bounds after mounting.
                     * State shouldUpdate ensures this is not done in an endless loop
                     * */
          if (
            this.state.shouldUpdate &&
            this.map &&
            !!this.props.children.length
          ) {
            this.setState({
              shouldUpdate: false
            });
            fitBounds(this.props.children, this.map);
          }
        }
      });
    },
    componentWillReceiveProps(nextProps) {
      const { center, children } = nextProps;

      /* If there are markers to render, update the map */
      if (children) {
        this.setState({
          shouldUpdate: true
        });
      }
      if (center && center.location) {
        this.setState({
          center: nextProps.center.location
        });
      }
    },
    componentDidUpdate() {
      /* Need to ensure that window.google is available before fitting bounds */
      if (
        this.state.shouldUpdate &&
        window.google &&
        this.map &&
        !!this.props.children.length
      ) {
        fitBounds(this.props.children, this.map);
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    defaultCenter={props.center}
    zoom={2}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={defaultMapOptions}
    onIdle={props.onIdle}
  >
    {props.children}
  </GoogleMap>
));

class MapComponent extends PureComponent {
  render() {
    return <MapWithASearchBox>{this.props.children}</MapWithASearchBox>;
  }
}

MapComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

MapComponent.defaultProps = {
  children: []
};

export default MapComponent;
