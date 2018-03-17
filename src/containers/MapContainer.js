import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Map from '../components/Map';

export default compose(
  firestoreConnect((props, store) => {
    const { auth } = store.getState().firebase;
    return auth
      ? [
          {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'companies' }]
          }
        ]
      : [];
  }),
  connect(({ firebase: { auth }, app: { filter }, firestore: { data } }) => ({
    auth,
    data,
    filter
  }))
)(Map);
