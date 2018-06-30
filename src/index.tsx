import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './configureStore';
// import { createStore } from 'redux';
// import { EnthusiasmAction } from './actions/index';
import Hello from './containers/Hello';
// import { enthusiasm } from './reducers/index';
// import { IStoreState } from './types/index';

/* const store = createStore<IStoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});
*/

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
