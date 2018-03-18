import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const Login = ({ auth }) =>
  isEmpty(auth) ? ( // If not logged in
    <div>Gotta login</div>
  ) : (
    // Otherwise redirect to dashboard
    <Redirect to={'/dashboard'} />
  );

Login.propTypes = {
  auth: PropTypes.shape().isRequired
};

export default compose(
  firestoreConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login);
