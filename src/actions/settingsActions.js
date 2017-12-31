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

export const INIT_ADD = 'INIT_ADD';
export function initAdd() {
  return dispatch => {
    dispatch({ type: INIT_ADD });
  };
}

export const CANCEL_ADD = 'CANCEL_ADD';
export function cancelAdd() {
  return dispatch => {
    dispatch({ type: CANCEL_ADD });
  };
}
