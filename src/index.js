import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import AppContainer from './containers/appContainer';
import store from './store';
const root = document.getElementById('root');


store.firebaseAuthIsReady.then(() => { // state is ready here
ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider> , root);
});

registerServiceWorker();
