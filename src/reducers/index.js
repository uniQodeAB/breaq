import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import app from './appReducer';

export default combineReducers({
  app,
  router: routerReducer,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
});
