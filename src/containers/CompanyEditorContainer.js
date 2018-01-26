import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { endAddCompany, endEditCompany } from '../actions/appActions';
import { addCompany, updateCompany } from '../actions/firebaseActions';
import deepGet from '../helpers';

import CompanyEditor from '../components/CompanyEditor';

function mapDispatchToProps(dispatch) {
  return {
    addCompany: company => dispatch(addCompany(company)),
    updateCompany: company => dispatch(updateCompany(company)),
    endAddCompany: () => dispatch(endAddCompany()),
    endEditCompany: id => dispatch(endEditCompany(id))
  };
}

export default compose(
  firebaseConnect(),
  connect(
    (
      { firebase: { data, auth }, app: { companies, color } },
      { companyId }
    ) => ({
      auth,
      company: deepGet(data, ['users', auth.uid, 'companies', companyId], {}),
      color: companyId
        ? companies[companyId] && companies[companyId].color
        : color
    }),
    mapDispatchToProps
  )
)(CompanyEditor);
