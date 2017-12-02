import React, {PureComponent} from 'react';
import {compose, lifecycle, withProps} from 'recompose';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import './MapComponent.css';

const defaultMapOptions = {
    fullscreenControl: false,
    clickableIcons: false,
    streetViewControl: false
};

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
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
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={defaultMapOptions}>

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