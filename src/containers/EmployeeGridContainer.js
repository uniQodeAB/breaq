import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeGrid from '../components/EmployeeGrid';
import {
  cancelAddEditEmployee,
  initEditEmployee
} from '../actions/settingsActions';

const mapDispatchToProps = dispatch => ({
  initEdit: id => {
    dispatch(initEditEmployee(id));
  },
  cancelEdit: () => {
    dispatch(cancelAddEditEmployee());
  }
});

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/employees`] : [];
  }),
  connect(
    ({ firebase: { data, auth }, settings: { addMode, editMode } }) => ({
      auth,
      active: addMode || editMode,
      employees:
        data.users && data.users[auth.uid] && data.users[auth.uid].employees
    }),
    mapDispatchToProps
  )
)(EmployeeGrid);
