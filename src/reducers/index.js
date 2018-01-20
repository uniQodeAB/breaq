import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';

import app from './appReducer';

export default combineReducers({
  app,
  router: routerReducer,
  firebase: firebaseStateReducer
});
