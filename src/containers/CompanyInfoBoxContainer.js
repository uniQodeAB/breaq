import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditCompany, initAddEmployee } from '../actions/appActions';
import { deleteCompany } from '../actions/firebaseActions';

import CompanyInfoBox from '../components/CompanyInfoBox';

function mapDispatchToProps(dispatch, state) {
  const { currentUser } = state.firebase.auth();

  return {
    deleteCompany: companyId => dispatch(deleteCompany(currentUser, companyId)),
    addEmployee: companyId => dispatch(initAddEmployee(companyId)),
    initEditCompany: companyId => dispatch(initEditCompany(companyId))
  };
}

export default compose(
  firebaseConnect(),
  connect(() => {}, mapDispatchToProps)
)(CompanyInfoBox);
