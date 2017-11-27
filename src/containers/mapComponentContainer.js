import { connect } from 'react-redux';
import MapComponent from '../components/MapComponent';
import { placesChanged } from '../actions/locationActions';

function mapStateToProps(state) {
    return {
        places: state.location.places
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangePlace: (places) => dispatch(placesChanged(places))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);