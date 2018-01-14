import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  initEditHomeBase,
  cancelEditHomeBase
} from '../actions/settingsActions';

import AddressBox from '../components/AddressBox';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  initEdit: () => {
    dispatch(initEditHomeBase());
  },
  cancelEdit: () => {
    dispatch(cancelEditHomeBase());
  }
});

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/base`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    location: data.users && data.users[auth.uid] && data.users[auth.uid].base,
    auth
  })),
  connect(mapStateToProps, mapDispatchToProps)
)(AddressBox);
