import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';

import settings from './settingsReducer';

export default combineReducers({
  settings,
  router: routerReducer,
  firebase: firebaseStateReducer
});
