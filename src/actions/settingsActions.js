export const SET_HOME_BASE = 'SET_HOME_BASE';
export function setHomeBase(base) {
  return dispatch => {
    dispatch({ type: SET_HOME_BASE, payload: createBase(base) });
  };
}

export const SET_USER_AT_BASE = 'SET_USER_AT_BASE';
export function setUserAtBase() {
  return dispatch => {
    dispatch({ type: SET_USER_AT_BASE });
  };
}

export const SHOW_USER_ADDRESS = 'SHOW_USER_ADDRESS';
export function showUserAddress() {
  return dispatch => {
    dispatch({ type: SHOW_USER_ADDRESS });
  };
}

export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
export function setUserAddress(address) {
  return dispatch => {
    dispatch({ type: SET_USER_ADDRESS, payload: createBase(address) });
  };
}

export const EDIT_HOME_BASE = 'EDIT_HOME_BASE';
export function editHomeBase() {
  return dispatch => {
    dispatch({ type: EDIT_HOME_BASE });
  };
}

export const CANCEL_EDIT_HOME_BASE = 'CANCEL_EDIT_HOME_BASE';
export function cancelEditHomeBase() {
  return dispatch => {
    dispatch({ type: CANCEL_EDIT_HOME_BASE });
  };
}

const createBase = base => {
  return {
    htmlAddress: base[0].adr_address,
    formattedAddress: base[0].formatted_address,
    location: base[0].geometry.location,
    name: base[0].name
  };
};
