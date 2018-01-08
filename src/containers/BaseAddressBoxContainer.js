import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  cancelEditHomeBase,
  initEditHomeBase
} from '../actions/settingsActions';

import BaseAddressBox from '../components/BaseAddressBox';

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
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/base`] : [];
  }),
  connect(
    ({ firebase: { data, auth }, settings: { editHomeBase } }) => ({
      base: data.users && data.users[auth.uid] && data.users[auth.uid].base,
      auth: auth,
      editMode: editHomeBase
    }),
    mapDispatchToProps
  )
)(BaseAddressBox);
