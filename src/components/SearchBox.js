import React, { PureComponent } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.props.onChangePlace(places);

                    this.setState({
                        places,
                    });
                },
            })
        },
    }),
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            onPlacesChanged={props.onPlacesChanged} >
            <input
                type="text"
                placeholder="Where is your home base?"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </StandaloneSearchBox>
    </div>
);

class SearchBox extends PureComponent {

    onChangePlace = (places) => {
        this.props.onChangePlace(places);
    };

    render() {
        return (
            <PlacesWithStandaloneSearchBox onChangePlace={this.onChangePlace}/>
        )
    }
}

export default SearchBox;