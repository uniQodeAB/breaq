import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddCompany, endEditCompany } from '../actions/appActions';
import { addCompany, updateCompany } from '../actions/firebaseActions';
import CompanyCreator from '../components/CompanyCreator';

function mapDispatchToProps(dispatch, state) {
  const { currentUser } = state.firebase.auth();

  return {
    addCompany: company => dispatch(addCompany(currentUser, company)),
    updateCompany: company => dispatch(updateCompany(currentUser, company)),
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
