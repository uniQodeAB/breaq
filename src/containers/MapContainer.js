import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Map from '../components/Map';

const test = () => {
  console.log('this is a test');
};

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    user: data.users,
    base: data.users && data.users[auth.uid] && data.users[auth.uid].base,
    employees:
      data.users && data.users[auth.uid] && data.users[auth.uid].employees,
    test: test
  }))
)(Map);
