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

// Listen for auth ready (promise available on store due to attachAuthIsReady: true config option)
/* store.firebaseAuthIsReady.then(() => {
  console.log('Auth has loaded'); // eslint-disable-line no-console
}); */

export default store;




/* const store = createStore<IStoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});
*/

