import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  cancelAddEditEmployee,
  cancelEditHomeBase,
  initAddEmployee
} from '../actions/appActions';
// import AddEditEmployee from '../components/AddEditEmployee';

/* function mapDispatchToProps(dispatch) {
  return {
    cancelEditHomeBase: () => dispatch(cancelEditHomeBase()),
    initAddEmployee: () => dispatch(initAddEmployee()),
    cancelAddEmployee: () => dispatch(cancelAddEditEmployee())
  };
}

const employeeHelper = (auth, data, employeeId) => {
  if (auth && employeeId && data.users[auth.uid].employees) {
    return data.users[auth.uid].employees[employeeId];
  }
  return {};
};

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
      employeeId,
      employee: employeeHelper(auth, data, employeeId),
      auth
    }),
    mapDispatchToProps
  ),
  connect(state => ({
    addMode: state.settings.addMode,
    editMode: state.settings.editMode
  }))
)(AddEditEmployee); */
