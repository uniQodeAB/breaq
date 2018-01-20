import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initEditCompany } from '../actions/appActions';

import CompanyInfoBox from '../components/CompanyInfoBox';

function mapDispatchToProps(dispatch) {
  return {
    initEditCompany: companyId => dispatch(initEditCompany(companyId))
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
)(CompanyInfoBox);
