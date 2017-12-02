import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
const root = document.getElementById('root');


store.firebaseAuthIsReady.then(() => { // state is ready here
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider> , root);
});

registerServiceWorker();
