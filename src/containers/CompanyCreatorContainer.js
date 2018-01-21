import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddCompany, endEditCompany } from '../actions/appActions';
import CompanyCreator from '../components/CompanyCreator';

function mapDispatchToProps(dispatch) {
  return {
    endAddCompany: () => dispatch(endAddCompany()),
    endEditCompany: id => dispatch(endEditCompany(id))
  };
}

export default compose(
  firebaseConnect(),
  connect(
    (
      { firebase: { data, auth }, app: { companies, color } },
      { companyId }
    ) => ({
      auth,
      company:
        data.users &&
        data.users[auth.uid] &&
        data.users[auth.uid].companies &&
        data.users[auth.uid].companies[companyId],
      color: companyId
        ? companies[companyId] && companies[companyId].color
        : color
    }),
    mapDispatchToProps
  )
)(CompanyCreator);
