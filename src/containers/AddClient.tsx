import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { submitClient } from '../actions/firebaseActions';
import AddClient from '../components/AddClient';
import { IClient, IStoreState } from '../types';

function mapDispatchToProps(dispatch:any) {
  return {
    submitClient: (client:IClient) => dispatch(submitClient(client)),
  };
}

function mapStateToProps({ client }: IStoreState) {
  return {
    client
  };
}

export default compose<React.SFC>(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddClient);
