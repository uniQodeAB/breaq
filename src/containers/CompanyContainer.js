import { connect } from 'react-redux';
import { compose } from 'redux';

import Company from '../components/Company';

export default compose(
  connect(({ app: { companies } }, { company: { id } }) => ({
    editCompany: companies[id] && companies[id].editCompany,
    addEmployee: companies[id] && companies[id].addEmployee,
    editEmployee: companies[id] && companies[id].editEmployee,
    editEmployeeId: companies[id] && companies[id].editEmployeeId
  }))
)(Company);
