import {
  INIT_EDIT_HOME_BASE,
  CANCEL_EDIT_HOME_BASE,
  INIT_ADD_EMPLOYEE,
  CANCEL_ADD_EDIT_EMPLOYEE,
  INIT_EDIT_EMPLOYEE
} from '../actions/settingsActions';

const initialState = {
  editHomeBase: false,
  addMode: false,
  editMode: false,
  employeeId: ''
};
export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_EDIT_HOME_BASE: {
      return { ...state, editHomeBase: true };
    }
    case CANCEL_EDIT_HOME_BASE: {
      return { ...state, editHomeBase: false };
    }
    case INIT_ADD_EMPLOYEE: {
      return { ...state, addMode: true };
    }
    case CANCEL_ADD_EDIT_EMPLOYEE: {
      return { ...state, addMode: false, editMode: false, employeeId: '' };
    }
    case INIT_EDIT_EMPLOYEE: {
      return { ...state, employeeId: action.payload, editMode: true };
    }
    default:
      return state;
  }
}
