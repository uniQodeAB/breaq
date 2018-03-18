import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { showCompany, hideCompany } from '../actions/appActions';

import CompanyLegend from '../components/CompanyLegend';

export default compose(
  firestoreConnect(),
  connect(
    ({ firestore: { ordered } }) => ({
      companies: ordered.users || []
    }),
    dispatch => ({
      showCompany: id => dispatch(showCompany(id)),
      hideCompany: id => dispatch(hideCompany(id))
    })
  )
)(CompanyLegend);
