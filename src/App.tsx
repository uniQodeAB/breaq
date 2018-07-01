import * as React from 'react';
import './App.css';

import AddClient from './containers/AddClient';
import ListClients from './containers/ListClients';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AddClient />
        <ListClients />
      </div>
    );
  }
}

export default App;
