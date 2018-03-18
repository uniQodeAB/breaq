import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ auth, component: Component, location, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isEmpty(auth) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.shape().isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.shape()
};

PrivateRoute.defaultProps = {
  location: {}
};

export default compose(
  firestoreConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute);
