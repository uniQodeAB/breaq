import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { ThunkDispatch } from 'redux-thunk';
import { AddClientAction } from '../actions';
import { submitClient } from '../actions/appActions';
import AddClient from '../components/AddClient';
import { IClient, IStoreState } from '../types';

function mapDispatchToProps(dispatch:ThunkDispatch<IStoreState, void, AddClientAction>) {
  return {
    submitClient: (client:IClient) => dispatch(submitClient(client)),
  };
}

function mapStateToProps() {
  return { };
}

export default compose<React.SFC>(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddClient);
