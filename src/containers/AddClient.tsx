import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addClient } from '../actions/appActions';

import { submitClient } from '../actions/firebaseActions';
import AddClient from '../components/AddClient';
import { IClient, IStoreState } from '../types';

function mapDispatchToProps(dispatch:any) {
  return {
    addClient: (client:IClient) => dispatch(addClient(client)),
    submitClient: (client:IClient) => dispatch(submitClient(client)),
  };
}

function mapStateToProps({ client, enthusiasmLevel, languageName }: IStoreState) {
  return {
    client,
    enthusiasmLevel,
    name: languageName,
  }
}


export default compose<React.SFC>(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddClient);
