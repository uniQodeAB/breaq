import { connect } from 'react-redux';
import { compose } from 'redux';
import { addColor, changeColor } from '../actions/appActions';

import ColorPicker from '../components/ColorPicker';

function mapDispatchToProps(dispatch) {
  return {
    addColor: color => dispatch(addColor(color)),
    changeColor: (companyId, color) => dispatch(changeColor(companyId, color))
  };
}

export default compose(
  connect(
    ({ app }, { companyId }) => ({
      companyId
    }),
    mapDispatchToProps
  )
)(ColorPicker);
