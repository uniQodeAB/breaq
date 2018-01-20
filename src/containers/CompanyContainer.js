import { connect } from 'react-redux';
import { compose } from 'redux';
import { initAddEmployee } from '../actions/appActions';

import Company from '../components/Company';

function mapDispatchToProps(dispatch) {
  return {
    initAddEmployee: companyId => dispatch(initAddEmployee(companyId))
  };
}

export default compose(
  connect(
    ({ app: { companies } }, { company: { id } }) => ({
      editCompany: companies[id] && companies[id].editCompany,
      addEmployee: companies[id] && companies[id].addEmployee,
      editEmployee: companies[id] && companies[id].editEmployee,
      editEmployeeId: companies[id] && companies[id].editEmployeeId
    }),
    mapDispatchToProps
  )
)(Company);
