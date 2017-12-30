import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SearchBoxControls from '../components/SearchBoxControls';
import { cancelEditHomeBase } from '../actions/settingsActions';

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/settings`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    address: data.users && data.users[auth.uid] && data.users[auth.uid].settings
  })),
  connect(
    state => ({
      editMode: state.settings.editingHomeBase
    }),
    dispatch => {
      return {
        cancelEditMode: () => dispatch(cancelEditHomeBase())
      };
    }
  )
)(SearchBoxControls);
