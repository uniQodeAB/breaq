import {
  INIT_EDIT_HOME_BASE,
  CANCEL_EDIT_HOME_BASE,
  INIT_ADD,
  CANCEL_ADD
} from '../actions/settingsActions';

export default function locationReducer(state = {}, action) {
  switch (action.type) {
    case INIT_EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: true };
    }
    case CANCEL_EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: false };
    }
    case INIT_ADD: {
      return { ...state, addMode: true };
    }
    case CANCEL_ADD: {
      return { ...state, addMode: false };
    }
    default:
      return state;
  }
}
