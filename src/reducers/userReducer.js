import actionTypes from '../constants/actionTypes';

const initialState = {
    user: {},
    loggedIn: false
}
export default function userReducer(state=initialState, action) {

    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUESTED: {
            console.log('Logging in...');
            return state;
        }
        case actionTypes.USER_LOGIN_FULFILLED: {
            return {...state, user: action.payload, loggedIn: true};
        }
        case actionTypes.AUTH_STATE_CHANGE: {
            return {...state, user: action.payload, loggedIn: true};
        }
        case actionTypes.USER_LOGOUT_FULFILLED: {
            return initialState;
        }
        default: return state
    }
}