import actionTypes from '../constants/locationActionTypes';

const initialState = {
    places: []
}
export default function locationReducer(state=initialState, action) {

    switch (action.type) {
        case actionTypes.STATE_CHANGE: {
            return {...state, places: action.payload};
        }
        default: return state
    }
}