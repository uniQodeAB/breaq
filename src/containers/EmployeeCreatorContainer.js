import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddEmployee, endEditEmployee } from '../actions/appActions';
import EmployeeCreator from '../components/EmployeeCreator';

function mapDispatchToProps(dispatch) {
  return {
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
    ({ firebase, firebase: { data, auth } }, { companyId, employeeId }) => ({
      employee:
        data.users &&
        data.users[auth.uid] &&
        data.users[auth.uid].companies &&
        data.users[auth.uid].companies[companyId] &&
        data.users[auth.uid].companies[companyId].employees &&
        data.users[auth.uid].companies[companyId].employees[employeeId],
      auth
    }),
    mapDispatchToProps
  )
)(EmployeeCreator);
