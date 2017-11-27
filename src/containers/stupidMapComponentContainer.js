import { connect } from 'react-redux';
import StupidMapComponent from '../components/signup/StupidMapComponent';

function mapStateToProps(state) {
    return {
        places: state.location.places
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StupidMapComponent);