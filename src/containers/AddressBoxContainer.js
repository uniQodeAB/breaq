import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { editHomeBase, cancelEditHomeBase } from '../actions/settingsActions';

import AddressBox from '../components/AddressBox';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    initEdit: () => {
      dispatch(editHomeBase());
    },
    cancelEdit: () => {
      dispatch(cancelEditHomeBase());
    }
  };
};

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/settings`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    location:
      data.users && data.users[auth.uid] && data.users[auth.uid].settings,
    auth: auth
  })),
  connect(mapStateToProps, mapDispatchToProps)
)(AddressBox);
