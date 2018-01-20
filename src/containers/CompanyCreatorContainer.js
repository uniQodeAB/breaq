import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddCompany } from '../actions/appActions';
import CompanyCreator from '../components/CompanyCreator';

function mapDispatchToProps(dispatch) {
  return {
    endAddCompany: () => dispatch(endAddCompany())
  };
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth } }) => ({
      auth
    }),
    mapDispatchToProps
  )
)(CompanyCreator);
