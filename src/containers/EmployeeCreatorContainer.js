import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddEmployee } from '../actions/appActions';
import EmployeeCreator from '../components/EmployeeCreator';

function mapDispatchToProps(dispatch) {
  return {
    endAddEmployee: () => dispatch(endAddEmployee())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;
    const { currentEmployeeId } = store.getState().app;
    const { currentCompanyId } = props;

    return auth
      ? [
          `users/${
            auth.uid
          }/companies/${currentCompanyId}/employees/${currentEmployeeId}`
        ]
      : [];
  }),
  connect(
    (
      { firebase: { data, auth }, app: { currentEmployeeId } },
      { currentCompanyId }
    ) => ({
      employee:
        data.users &&
        data.users[auth.uid] &&
        data.users[auth.uid].companies &&
        data.users[auth.uid].companies[currentCompanyId] &&
        data.users[auth.uid].companies[currentCompanyId].employees &&
        data.users[auth.uid].companies[currentCompanyId].employees[
          currentEmployeeId
        ],
      auth
    }),
    mapDispatchToProps
  )
)(EmployeeCreator);
