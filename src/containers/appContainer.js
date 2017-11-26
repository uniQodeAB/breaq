import { connect } from 'react-redux';
import App from '../App';
import { loginUser, logoutUser, listenForStateChange } from '../actions/userActions';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch(loginUser()),
        onLogout: () => dispatch(logoutUser()),
        onAuthStateChanged: () => dispatch(listenForStateChange())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);