import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditEmployee } from '../actions/appActions';

import EmployeeInfoBox from '../components/EmployeeInfoBox';

function mapDispatchToProps(dispatch) {
  return {
    initEditEmployee: (companyId, employeeId) =>
      dispatch(initEditEmployee(companyId, employeeId))
  };
}

export default compose(
  firebaseConnect(),
  connect(() => {}, mapDispatchToProps)
)(EmployeeInfoBox);
