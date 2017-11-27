import { connect } from 'react-redux';
import Searchbox from '../components/signup/Searchbox';
import { placesChanged } from '../actions/locationActions';

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangePlace: (places) => dispatch(placesChanged(places))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);