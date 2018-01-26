import {
  INIT_ADD_COMPANY,
  END_ADD_COMPANY,
  INIT_EDIT_COMPANY,
  END_EDIT_COMPANY,
  INIT_ADD_EMPLOYEE,
  END_ADD_EMPLOYEE,
  INIT_EDIT_EMPLOYEE,
  END_EDIT_EMPLOYEE,
  HIDE_COMPANY,
  SHOW_COMPANY
} from '../actions/appActions';

const initialState = {
  addCompany: false,
  companies: {},
  filter: []
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
          [action.payload.companyId]: {
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
          [action.payload.companyId]: {
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
          [action.payload.companyId]: {
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
          [action.payload.companyId]: {
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
    case HIDE_COMPANY: {
      const filter = state.filter.slice();
      filter.push(action.payload.companyId);
      return {
        ...state,
        filter
      };
    }
    case SHOW_COMPANY: {
      return {
        ...state,
        filter: state.filter.filter(id => id !== action.payload.companyId)
      };
    }
    default:
      return state;
  }
}
