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

            this.setState({
                center: nextProps.center
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

        {props.children}

    </GoogleMap>
);

class MapComponent extends PureComponent {

    render() {
        return (
            <MapWithASearchBox center={this.props.center}>
                {this.props.children}
            </MapWithASearchBox>
        );
    }
}

export default MapComponent;