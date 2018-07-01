import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { ThunkDispatch } from 'redux-thunk';
import { ClientAction } from '../actions';
import { submitClient } from '../actions/appActions';
import AddClient from '../components/AddClient';
import { IClient, IStoreState } from '../types';

function mapDispatchToProps(dispatch:ThunkDispatch<IStoreState, void, ClientAction>) {
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
