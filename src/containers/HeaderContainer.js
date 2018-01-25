import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
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
  connect(
    ({ firebase: { auth } }) => ({
      isLoggedOut: isEmpty(auth),
      photo: !isEmpty(auth) && auth.photoURL
    }),
    mapDispatchToProps
  )
)(Header);
