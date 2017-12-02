import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({ auth, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !isEmpty(auth) ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
    rest: PropTypes.any
};

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(
        ({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)