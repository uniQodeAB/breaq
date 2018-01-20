import {
  INIT_ADD_COMPANY,
  END_ADD_COMPANY,
  INIT_ADD_EMPLOYEE,
  END_ADD_EMPLOYEE,
  CANCEL_EDIT_HOME_BASE,
  CANCEL_ADD_EDIT_EMPLOYEE,
  INIT_EDIT_EMPLOYEE
} from '../actions/appActions';

const initialState = {
  addCompany: false,
  companies: {},
  addEmployee: false,
  editHomeBase: false,
  addMode: false,
  editMode: false,
  employeeId: ''
};
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_ADD_COMPANY: {
      return { ...state, addCompany: true };
    }
    case END_ADD_COMPANY: {
      return { ...state, addCompany: false };
    }
    case INIT_ADD_EMPLOYEE: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload]: {
            addEmployee: true
          }
        }
      };
    }
    case END_ADD_EMPLOYEE: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload]: {
            addEmployee: false
          }
        }
      };
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
