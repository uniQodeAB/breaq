import { combineReducers } from 'redux';

import settings from './settingsReducer';
import router from './routerReducer';

import { firebaseStateReducer } from 'react-redux-firebase'

export default combineReducers({
    settings,
    router,
    firebase: firebaseStateReducer
});