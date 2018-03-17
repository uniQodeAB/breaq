import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditCompany, initAddEmployee } from '../actions/appActions';
import { deleteCompany } from '../actions/firebaseActions';

import { CompanyInfoBox } from '../components/InfoBox';

function mapDispatchToProps(dispatch) {
  return {
    deleteCompany: companyId => dispatch(deleteCompany(companyId)),
    addEmployee: companyId => dispatch(initAddEmployee(companyId)),
    initEditCompany: companyId => dispatch(initEditCompany(companyId))
  };
}

export default compose(
  firestoreConnect(),
  connect(() => ({}), mapDispatchToProps)
)(CompanyInfoBox);
