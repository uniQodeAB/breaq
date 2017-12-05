import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import {Redirect} from 'react-router-dom';

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
                <div>
                    <h1>Todos</h1>
                    <ul>

                    </ul>
                    <button onClick={() => {
                        firebase.set('users', {
                            alanisawesome: {
                                date_of_birth: "June 23, 1912",
                                full_name: "Alan Turing"
                            },
                            gracehop: {
                                date_of_birth: "December 9, 1906",
                                full_name: "Grace Hopper"
                            }
                        });
                    }}>
                        Add
                    </button>
                </div>
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