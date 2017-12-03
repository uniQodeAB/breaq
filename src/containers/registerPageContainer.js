import { connect } from 'react-redux';
import Register from '../components/signup/RegisterPage';
import { setHomeBase } from '../actions/settingsActions';

function mapStateToProps(state) {
    return {
        base: state.settings.base
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setHomeBase: (location) => dispatch(setHomeBase(location))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);