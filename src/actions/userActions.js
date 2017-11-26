import {auth, provider} from '../firebase.js';
import actionTypes from '../constants/actionTypes';

export function loginUser() {

    return dispatch => {

        dispatch({ type: actionTypes.USER_LOGIN_REQUESTED });
        provider.setCustomParameters({ prompt: 'select_account' });

        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(
                    {
                        type: actionTypes.USER_LOGIN_FULFILLED,
                        payload: result.user
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: actionTypes.USER_LOGIN_REJECTED });
            });
    }
}

export function logoutUser() {
    return dispatch => {

        dispatch({ type: actionTypes.USER_LOGOUT_REQUESTED });

        auth.signOut()
            .then(() => {
                dispatch({ type: actionTypes.USER_LOGOUT_FULFILLED });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: actionTypes.USER_LOGOUT_REJECTED });
            });
    }
}

export function listenForStateChange() {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: actionTypes.AUTH_STATE_CHANGE, payload: user });
            }
        });
    }

}