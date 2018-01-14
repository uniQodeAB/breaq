import React, { PureComponent } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { withScriptjs } from 'react-google-maps';
import PropTypes from 'prop-types';

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.props.onChangePlace(places[0]);

          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '100%',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipsis'
        }}
      />
    </StandaloneSearchBox>
  </div>
));

class SearchBox extends PureComponent {
  render() {
    return (
      <div className={'search-box'}>
        <PlacesWithStandaloneSearchBox
          onChangePlace={places => this.props.onChangePlace(places)}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  onChangePlace: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

SearchBox.defaultProps = {
  placeholder: 'Search...'
};

export default SearchBox;
