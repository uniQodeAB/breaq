import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CompanyList from '../components/CompanyList';

export default compose(
  firestoreConnect(),
  connect(({ firestore: { ordered } }) => ({ companies: ordered.users }))
)(CompanyList);
