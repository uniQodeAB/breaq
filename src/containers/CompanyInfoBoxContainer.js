import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditCompany, initAddEmployee } from '../actions/appActions';

import CompanyInfoBox from '../components/CompanyInfoBox';

function mapDispatchToProps(dispatch) {
  return {
    addEmployee: companyId => dispatch(initAddEmployee(companyId)),
    initEditCompany: companyId => dispatch(initEditCompany(companyId))
  };
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth } }) => ({
      auth
    }),
    mapDispatchToProps
  )
)(CompanyInfoBox);
