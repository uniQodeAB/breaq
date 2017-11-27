import actionTypes from '../constants/locationActionTypes';

export function placesChanged(places) {
    return dispatch => {
        dispatch({type: actionTypes.STATE_CHANGE, payload: places});
    }
}