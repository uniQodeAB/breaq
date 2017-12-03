import { combineReducers } from 'redux';

import settings from './settingsReducer';
import { routerReducer } from 'react-router-redux'

import { firebaseStateReducer } from 'react-redux-firebase'

export default combineReducers({
    settings,
    router: routerReducer,
    firebase: firebaseStateReducer
});