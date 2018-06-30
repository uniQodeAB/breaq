import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import app from './appReducer';

export default combineReducers({
  app,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
  router: routerReducer
});
