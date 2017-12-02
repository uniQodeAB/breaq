import { combineReducers } from 'redux';

import location from './locationReducer';
import router from './routerReducer';

import { firebaseStateReducer } from 'react-redux-firebase'

export default combineReducers({
    location,
    router,
    firebase: firebaseStateReducer
});