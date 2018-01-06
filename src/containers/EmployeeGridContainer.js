import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeGrid from '../components/EmployeeGrid';

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/employees`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    employees:
      data.users && data.users[auth.uid] && data.users[auth.uid].employees
  }))
)(EmployeeGrid);
