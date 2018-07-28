import * as React from 'react';
import { withScriptjs} from 'react-google-maps';
import StandaloneSearchBox, { StandaloneSearchBoxProps } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { compose, lifecycle, withProps } from 'recompose';
import { ILocation } from '../types';

interface ISearchBoxProps extends StandaloneSearchBoxProps, IProps {
  places: google.maps.places.PlaceResult[];
  onSearchBoxMounted(): void;
}

interface IProps extends StandaloneSearchBoxProps {
  placeholder: string;
  onChange: (location:ILocation) => void;
}


const LocationSearchBox = compose<ISearchBoxProps, IProps>(
  withProps({
    containerElement: <div style={{ height: `400px` }} />,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />
  }),
  lifecycle<ISearchBoxProps, {}>({
    componentWillMount() {
      const refs:any = {};

      this.setState({
        onPlacesChanged: () => {
          const places:google.maps.places.PlaceResult[] = refs.searchBox.getPlaces();

          const {
            place_id,
            formatted_address,
            geometry: {
              location
            }
          } = places[0];

          this.props.onChange({
            address: formatted_address,
            id: place_id,
            lat: location.lat(),
            lng: location.lng(),
          });

          this.setState({
            places,
          });
        },
        onSearchBoxMounted: (ref:StandaloneSearchBox) => {
          refs.searchBox = ref;
        },
        places: [],
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          border: `1px solid transparent`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          boxSizing: `border-box`,
          fontSize: `14px`,
          height: `32px`,
          outline: `none`,
          padding: `0 12px`,
          textOverflow: `ellipses`,
          width: `240px`
        }}
      />
    </StandaloneSearchBox>
  </div>
);

export default LocationSearchBox;
