import { combineReducers } from 'redux';

import user from './userReducer';
import location from './locationReducer';

import { firebaseStateReducer } from 'react-redux-firebase'

export default combineReducers({
    user,
    location,
    firebase: firebaseStateReducer
});