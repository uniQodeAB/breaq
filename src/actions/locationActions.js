import actionTypes from '../constants/locationActionTypes';

export function setHomeBase(base) {
    return dispatch => {
        const b = {
            htmlAddress: base[0].adr_address,
            formattedAddress: base[0].formatted_address,
            location: base[0].geometry.location,
            name: base[0].name
        }
        dispatch({type: actionTypes.SET_HOME_BASE, payload: b});
    }
}