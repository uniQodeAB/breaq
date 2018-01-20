import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddCompany } from '../actions/appActions';
import CompanyCreator from '../components/CompanyCreator';

function mapDispatchToProps(dispatch) {
  return {
    endAddCompany: () => dispatch(endAddCompany())
  };
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { data, auth } }, { companyId }) => ({
      auth,
      company:
        data.users &&
        data.users[auth.uid] &&
        data.users[auth.uid].companies &&
        data.users[auth.uid].companies[companyId]
    }),
    mapDispatchToProps
  )
)(CompanyCreator);
