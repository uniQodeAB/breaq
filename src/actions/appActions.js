export const INIT_ADD_COMPANY = 'INIT_ADD_COMPANY';
export function initAddCompany() {
  return dispatch => {
    dispatch({ type: INIT_ADD_COMPANY });
  };
}

export const END_ADD_COMPANY = 'END_ADD_COMPANY';
export function endAddCompany() {
  return dispatch => {
    dispatch({ type: END_ADD_COMPANY });
  };
}

export const INIT_ADD_EMPLOYEE = 'INIT_ADD_EMPLOYEE';
export function initAddEmployee(companyId) {
  return dispatch => {
    dispatch({ type: INIT_ADD_EMPLOYEE, payload: companyId });
  };
}

export const END_ADD_EMPLOYEE = 'END_ADD_EMPLOYEE';
export function endAddEmployee(companyId) {
  return dispatch => {
    dispatch({ type: END_ADD_EMPLOYEE, payload: companyId });
  };
}

export const INIT_EDIT_EMPLOYEE = 'INIT_EDIT_EMPLOYEE';
export function initEditEmployee(companyId, employeeId) {
  return dispatch => {
    dispatch({ type: INIT_EDIT_EMPLOYEE, payload: { companyId, employeeId } });
  };
}

export const END_EDIT_EMPLOYEE = 'END_EDIT_EMPLOYEE';
export function endEditEmployee(companyId, employeeId) {
  return dispatch => {
    dispatch({ type: END_EDIT_EMPLOYEE, payload: { companyId, employeeId } });
  };
}

export const CANCEL_EDIT_HOME_BASE = 'CANCEL_EDIT_HOME_BASE';
export function cancelEditHomeBase() {
  return dispatch => {
    dispatch({ type: CANCEL_EDIT_HOME_BASE });
  };
}

export const CANCEL_ADD_EDIT_EMPLOYEE = 'CANCEL_ADD_EDIT_EMPLOYEE';
export function cancelAddEditEmployee() {
  return dispatch => {
    dispatch({ type: CANCEL_ADD_EDIT_EMPLOYEE });
  };
}
