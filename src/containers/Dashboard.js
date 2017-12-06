import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import {Redirect} from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const Dashboard = ({firebase, user}) => {
    return (
        !isLoaded(user)
            ?
            <p>Loading...</p>
            :
            isEmpty(user) || isEmpty(user.settings)
                ?
                <Redirect to={'/register'}/>
                :
                <MapComponent />
    );
};

export default compose(
    firebaseConnect((props, store) => {
        const {auth} = store.getState().firebase;

        return auth ? [`users/${auth.uid}/settings`] : []
    }),
    connect(({firebase: {data, auth}}) => ({
        user: data.users && data.users[auth.uid],
    }))
)(Dashboard)

/*
(props, store) => {
        const state = store.getState();
        // Get Todos stored by user UID
        return state.auth ? [`settings/${state.auth.uid}`] : []
    }
 */