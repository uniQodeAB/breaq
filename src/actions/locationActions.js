import actionTypes from '../constants/locationActionTypes';

export function setHomeBase(base) {
    return dispatch => {
        const b = {...base[0], locationType: 'home_base'};
        dispatch({type: actionTypes.SET_HOME_BASE, payload: b});
    }
}