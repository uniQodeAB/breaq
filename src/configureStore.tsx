import createHistory from 'history/createBrowserHistory';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, StoreEnhancerStoreCreator } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import firebase from './firebase';
import reducer from './reducers';

// react-redux-firebase config
const rrfConfig = {
  allowMultipleListeners: true,
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default),
  useFirestoreForProfile: true,
  userProfile: 'users' // firebase root where user profiles are stored
};

const createStoreWithFirebase:StoreEnhancerStoreCreator = compose<StoreEnhancerStoreCreator>(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase, rrfConfig),
  applyMiddleware(
    promise(),
    thunk.withExtraArgument(getFirebase),
    createLogger(),
    routerMiddleware(createHistory())
  )
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(reducer, initialState);

export default store;
