import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditEmployee } from '../actions/appActions';
import { deleteEmployee } from '../actions/firebaseActions';

import { EmployeeInfoBox } from '../components/InfoBox';

function mapDispatchToProps(dispatch) {
  return {
    deleteEmployee: (companyId, employeeId) =>
      dispatch(deleteEmployee(companyId, employeeId)),
    initEditEmployee: (companyId, employeeId) =>
      dispatch(initEditEmployee(companyId, employeeId))
  };
}

export default compose(
  firestoreConnect(),
  connect(() => ({}), mapDispatchToProps)
)(EmployeeInfoBox);
