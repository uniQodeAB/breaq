import {
  cancelAdd,
  cancelEditHomeBase,
  initAdd
} from '../actions/settingsActions';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AddEmployee from '../components/AddEmployee';

function mapDispatchToProps(dispatch) {
  return {
    cancelEditHomeBase: () => dispatch(cancelEditHomeBase()),
    initAdd: () => dispatch(initAdd()),
    cancelAdd: () => dispatch(cancelAdd())
  };
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth } }) => ({
      auth: auth
    }),
    mapDispatchToProps
  ),
  connect(state => ({
    addMode: state.settings.addMode
  }))
)(AddEmployee);
