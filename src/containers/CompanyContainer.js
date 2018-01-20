import { connect } from 'react-redux';
import { compose } from 'redux';
import { initAddEmployee } from '../actions/appActions';

import Company from '../components/Company';

function mapDispatchToProps(dispatch) {
  return {
    initAddEmployee: () => dispatch(initAddEmployee())
  };
}

export default compose(
  connect(
    ({ app: { addEmployee } }) => ({
      addEmployee
    }),
    mapDispatchToProps
  )
)(Company);
