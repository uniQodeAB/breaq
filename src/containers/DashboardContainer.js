import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initAddCompany } from '../actions/appActions';

import Dashboard from '../components/Dashboard';

function mapDispatchToProps(dispatch) {
  return {
    initAddCompany: () => dispatch(initAddCompany())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth
      ? [
          {
            path: 'companies',
            collection: `users/${auth.uid}/companies`,
            storeAs: 'companies'
          }
        ]
      : [];
  }),
  connect(
    ({ firebase: { data, auth }, app: { addCompany } }) => ({
      user: data.users && data.users[auth.uid],
      auth,
      addCompany
    }),
    mapDispatchToProps
  )
)(Dashboard);
