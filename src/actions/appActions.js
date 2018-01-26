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

export const INIT_EDIT_COMPANY = 'INIT_EDIT_COMPANY';
export function initEditCompany(companyId) {
  return dispatch => {
    dispatch({ type: INIT_EDIT_COMPANY, payload: { companyId } });
  };
}

export const END_EDIT_COMPANY = 'END_EDIT_COMPANY';
export function endEditCompany(companyId) {
  return dispatch => {
    dispatch({ type: END_EDIT_COMPANY, payload: { companyId } });
  };
}

export const INIT_ADD_EMPLOYEE = 'INIT_ADD_EMPLOYEE';
export function initAddEmployee(companyId) {
  return dispatch => {
    dispatch({ type: INIT_ADD_EMPLOYEE, payload: { companyId } });
  };
}

export const END_ADD_EMPLOYEE = 'END_ADD_EMPLOYEE';
export function endAddEmployee(companyId) {
  return dispatch => {
    dispatch({ type: END_ADD_EMPLOYEE, payload: { companyId } });
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

export const HIDE_COMPANY = 'HIDE_COMPANY';
export function hideCompany(companyId) {
  return dispatch => {
    dispatch({ type: HIDE_COMPANY, payload: { companyId } });
  };
}

export const SHOW_COMPANY = 'SHOW_COMPANY';
export function showCompany(companyId) {
  return dispatch => {
    dispatch({ type: SHOW_COMPANY, payload: { companyId } });
  };
}
