import {
  cancelAddEditEmployee,
  cancelEditHomeBase,
  initAddEmployee
} from '../actions/settingsActions';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AddEditEmployee from '../components/AddEditEmployee.js';

function mapDispatchToProps(dispatch) {
  return {
    cancelEditHomeBase: () => dispatch(cancelEditHomeBase()),
    initAddEmployee: () => dispatch(initAddEmployee()),
    cancelAddEmployee: () => dispatch(cancelAddEditEmployee())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;
    const { employeeId } = store.getState().settings;

    return auth && employeeId
      ? [`users/${auth.uid}/employees/${employeeId}`]
      : [];
  }),
  connect(
    ({ firebase: { data, auth }, settings: { employeeId } }) => ({
      employeeId: employeeId,
      employee:
        auth &&
        employeeId &&
        data.users[auth.uid].employees &&
        data.users[auth.uid].employees[employeeId],
      auth: auth
    }),
    mapDispatchToProps
  ),
  connect(state => ({
    addMode: state.settings.addMode,
    editMode: state.settings.editMode
  }))
)(AddEditEmployee);
