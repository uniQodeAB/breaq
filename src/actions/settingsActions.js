export const INIT_EDIT_HOME_BASE = 'INIT_EDIT_HOME_BASE';
export function initEditHomeBase() {
  return dispatch => {
    dispatch({ type: INIT_EDIT_HOME_BASE });
  };
}

export const CANCEL_EDIT_HOME_BASE = 'CANCEL_EDIT_HOME_BASE';
export function cancelEditHomeBase() {
  return dispatch => {
    dispatch({ type: CANCEL_EDIT_HOME_BASE });
  };
}

export const INIT_ADD_EMPLOYEE = 'INIT_ADD_EMPLOYEE';
export function initAddEmployee() {
  return dispatch => {
    dispatch({ type: INIT_ADD_EMPLOYEE });
  };
}

export const CANCEL_ADD_EMPLOYEE = 'CANCEL_ADD_EMPLOYEE';
export function cancelAddEmployee() {
  return dispatch => {
    dispatch({ type: CANCEL_ADD_EMPLOYEE });
  };
}

export const INIT_EDIT_EMPLOYEE = 'INIT_EDIT_EMPLOYEE';
export function initEditEmployee(id) {
  return dispatch => {
    dispatch({ type: INIT_EDIT_EMPLOYEE, payload: id });
  };
}
