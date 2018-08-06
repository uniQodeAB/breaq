import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CreateClientAction, UpdateClientAction } from '../actions';
import { createClient, updateClient } from '../actions/appActions';
import AddClient from '../components/AddClient';
import { IClient, IStoreState } from '../types';

function mapDispatchToProps(dispatch:ThunkDispatch<IStoreState, void, CreateClientAction | UpdateClientAction>) {
  return {
    createClient: (client:IClient) => dispatch(createClient(client)),
    updateClient: (client:IClient) => dispatch(updateClient(client)),
  };
}

function mapStateToProps() {
  return { }
}

export default compose<React.SFC>(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddClient);
