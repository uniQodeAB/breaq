/*global google*/

import React, {PureComponent} from 'react';
import _ from 'lodash';
import {compose, lifecycle, withProps} from 'recompose';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import './MapComponent.css';

const MapWithASearchBox = compose(
    withProps({
        loadingElement: <div className={'loading-element'} />,
        containerElement: <div className={'MapComponent'} />,
        mapElement: <div className={'map-element'} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 60.09726, lng: 19.93481
                },
                markers: [],
                places: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                }
            });
        },
        componentWillReceiveProps(nextProps) {

            const places = nextProps.places;
            const bounds = new google.maps.LatLngBounds();

            places.forEach(place => {
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport)
                } else {
                    bounds.extend(place.geometry.location)
                }
            });
            const nextMarkers = places.map(place => ({
                position: place.geometry.location,
            }));

            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

            this.setState({
                center: nextCenter,
                markers: nextMarkers,
            });
        }
    }),
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}>

        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position}/>
        )}
    </GoogleMap>
);

class MapComponent extends PureComponent {

    constructor() {
        super();
        this.state = {
            pokemon: 'pokemon'
        };
    }

    render() {
        return (
            <MapWithASearchBox places={this.props.places}/>
        );
    }
}

export default MapComponent;