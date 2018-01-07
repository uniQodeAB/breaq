import {
  INIT_EDIT_HOME_BASE,
  CANCEL_EDIT_HOME_BASE,
  INIT_ADD_EMPLOYEE,
  CANCEL_ADD_EMPLOYEE,
  INIT_EDIT_EMPLOYEE
} from '../actions/settingsActions';

export default function locationReducer(state = {}, action) {
  switch (action.type) {
    case INIT_EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: true };
    }
    case CANCEL_EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: false };
    }
    case INIT_ADD_EMPLOYEE: {
      return { ...state, addMode: true };
    }
    case CANCEL_ADD_EMPLOYEE: {
      return { ...state, addMode: false, editMode: false };
    }
    case INIT_EDIT_EMPLOYEE: {
      return { ...state, employeeId: action.payload, editMode: true };
    }
    default:
      return state;
  }
}
