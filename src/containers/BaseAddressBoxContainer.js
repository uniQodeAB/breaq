import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  initEditHomeBase,
  cancelEditHomeBase
} from '../actions/settingsActions';

import BaseAddressBox from '../components/BaseAddressBox';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    initEdit: () => {
      dispatch(initEditHomeBase());
    },
    cancelEdit: () => {
      dispatch(cancelEditHomeBase());
    }
  };
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    auth: auth
  })),
  connect(mapStateToProps, mapDispatchToProps)
)(BaseAddressBox);
