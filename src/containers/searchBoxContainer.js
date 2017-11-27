import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import { placesChanged } from '../actions/locationActions';

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangePlace: (places) => dispatch(placesChanged(places))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);