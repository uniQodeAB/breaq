import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { login, logout } from '../actions/firebaseActions';
import Header from '../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  };
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }), mapDispatchToProps)
)(Header);
