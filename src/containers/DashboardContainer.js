import {
  cancelAddEmployee,
  cancelEditHomeBase,
  initAddEmployee
} from '../actions/settingsActions';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DashBoard from '../components/Dashboard';

function mapDispatchToProps(dispatch) {
  return {
    cancelEditHomeBase: () => dispatch(cancelEditHomeBase()),
    initAddEmployee: () => dispatch(initAddEmployee()),
    cancelAddEmployee: () => dispatch(cancelAddEmployee())
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/base`] : [];
  }),
  connect(
    ({ firebase: { data, auth } }) => ({
      user: data.users && data.users[auth.uid],
      auth: auth
    }),
    mapDispatchToProps
  ),
  connect(state => ({
    editMode: state.settings.editingHomeBase,
    addMode: state.settings.addMode
  }))
)(DashBoard);
