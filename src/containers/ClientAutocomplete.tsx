import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Autocomplete, { ISuggestion } from '../components/Autocomplete';
import { IClient, IFirestoreState } from '../types';

interface IClientDoc {
  id: string,
  client: IClient
}

interface IProps {
  placeholder: string,
  value:string,
  onChange: (newValue:string) => void;
  onSelect:(event:React.FormEvent<any>, { suggestion } : { suggestion:ISuggestion }) => void;
}

function mapDispatchToProps() {
  return { };
}

function mapStateToProps({ firestore: { ordered, status } }:IFirestoreState, ownProps: IProps) {
  const clientDocs:IClientDoc[] = ordered.clients;

  return {
    loading: status.requesting.clients || false,
    placeholder: ownProps.placeholder,
    suggestions : clientDocs ? clientDocs.map((clientDoc) => ({
      id: clientDoc.client.id,
      name: clientDoc.client.name
    })) : []
  }
}

export default compose<React.SFC<IProps>>(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Autocomplete);
