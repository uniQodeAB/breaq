import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { showCompany, hideCompany } from '../actions/appActions';

import CompanyLegend from '../components/CompanyLegend';

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/companies/`] : [];
  }),
  connect(
    ({ firebase: { data, auth } }) => ({
      companies:
        (data.users &&
          data.users[auth.uid] &&
          data.users[auth.uid].companies) ||
        {}
    }),
    dispatch => ({
      showCompany: id => dispatch(showCompany(id)),
      hideCompany: id => dispatch(hideCompany(id))
    })
  )
)(CompanyLegend);
