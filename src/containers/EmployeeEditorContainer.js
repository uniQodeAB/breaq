import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddEmployee, endEditEmployee } from '../actions/appActions';
import { addEmployee, updateEmployee } from '../actions/firebaseActions';

import EmployeeEditor from '../components/EmployeeEditor';

function mapDispatchToProps(dispatch) {
  return {
    addEmployee: (companyId, employee) =>
      dispatch(addEmployee(companyId, employee)),
    updateEmployee: (companyId, employee) =>
      dispatch(updateEmployee(companyId, employee)),
    endAddEmployee: companyId => dispatch(endAddEmployee(companyId)),
    endEditEmployee: (companyId, employeeId) =>
      dispatch(endEditEmployee(companyId, employeeId))
  };
}

export default compose(
  firestoreConnect(),
  connect(
    (
      { firebase, firebase: { data, auth, ref }, firestore: { ordered } },
      { companyId, employeeId }
    ) => ({
      employee: ordered[`employees/${companyId}`].find(
        employee => employee.id === employeeId
      ),
      auth
    }),
    mapDispatchToProps
  )
)(EmployeeEditor);
