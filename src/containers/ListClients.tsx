import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addClient } from '../actions/appActions';

import { submitClient } from '../actions/firebaseActions';
import ListClients from '../components/ListClients';
import { IClient, IFirestoreState } from '../types';

interface IClientDoc {
  id: string,
  client: IClient
}

function mapDispatchToProps(dispatch:any) {
  return {
    addClient: (client:IClient) => dispatch(addClient(client)),
    submitClient: (client:IClient) => dispatch(submitClient(client)),
  };
}

function mapStateToProps({ firestore: { ordered } }:IFirestoreState) {
  const clientDocs:IClientDoc[] = ordered.clients;

  return {
    clients : clientDocs ? clientDocs.map((clientDoc) => clientDoc.client) : []
  }
}


export default compose<React.SFC>(
  firestoreConnect(['clients']),
  connect(mapStateToProps, mapDispatchToProps)
)(ListClients);
