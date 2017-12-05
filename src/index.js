import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'

import App from './App';
import store from './store';
import history from './history';

const root = document.getElementById('root');


store.firebaseAuthIsReady.then(() => { // state is ready here
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>, root);
});

registerServiceWorker();
