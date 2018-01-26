import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddEmployee, endEditEmployee } from '../actions/appActions';
import { addEmployee, updateEmployee } from '../actions/firebaseActions';
import deepGet from '../helpers';

import EmployeeEditor from '../components/EmployeeEditor';

function mapDispatchToProps(dispatch, state) {
  const { currentUser } = state.firebase.auth();

  return {
    addEmployee: (companyId, employee) =>
      dispatch(addEmployee(currentUser, companyId, employee)),
    updateEmployee: (companyId, employee) =>
      dispatch(updateEmployee(currentUser, companyId, employee)),
    endAddEmployee: companyId => dispatch(endAddEmployee(companyId)),
    endEditEmployee: (companyId, employeeId) =>
      dispatch(endEditEmployee(companyId, employeeId))
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;
    const { companyId, employeeId } = props;

    return auth
      ? [`users/${auth.uid}/companies/${companyId}/employees/${employeeId}`]
      : [];
  }),
  connect(
    (
      { firebase, firebase: { data, auth, ref } },
      { companyId, employeeId }
    ) => ({
      employee: deepGet(
        data,
        ['users', auth.uid, 'companies', companyId, 'employees', employeeId],
        {}
      ),
      auth
    }),
    mapDispatchToProps
  )
)(EmployeeEditor);
