import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ListClients from '../components/ListClients';
import { IClient, IFirestoreState } from '../types';

interface IClientDoc {
  id: string,
  client: IClient
}

function mapDispatchToProps(dispatch:any) {
  return { };
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
