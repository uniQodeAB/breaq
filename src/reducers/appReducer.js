import {
  INIT_ADD_COMPANY,
  END_ADD_COMPANY,
  INIT_EDIT_COMPANY,
  END_EDIT_COMPANY,
  INIT_ADD_EMPLOYEE,
  END_ADD_EMPLOYEE,
  INIT_EDIT_EMPLOYEE,
  END_EDIT_EMPLOYEE
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
    case INIT_EDIT_COMPANY: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload]: {
            editCompany: true
          }
        }
      };
    }
    case END_EDIT_COMPANY: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload]: {
            editCompany: false
          }
        }
      };
    }
    case INIT_EDIT_EMPLOYEE: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload.companyId]: {
            editEmployee: true,
            editEmployeeId: action.payload.employeeId
          }
        }
      };
    }
    case END_EDIT_EMPLOYEE: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload.companyId]: {
            editEmployee: false,
            editEmployeeId: ''
          }
        }
      };
    }
    default:
      return state;
  }
}
