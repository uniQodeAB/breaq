import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

import reducer from './reducers';
import firebase from './firebase';
import history from './history';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default),
  useFirestoreForProfile: true,
  allowMultipleListeners: true
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
  applyMiddleware(
    promise(),
    thunk.withExtraArgument(getFirebase),
    createLogger(),
    routerMiddleware(history)
  )
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(reducer, initialState);

// Listen for auth ready (promise available on store due to attachAuthIsReady: true config option)
store.firebaseAuthIsReady.then(() => {
  console.log('Auth has loaded'); // eslint-disable-line no-console
});

export default store;
