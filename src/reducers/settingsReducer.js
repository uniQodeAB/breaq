import actionTypes from '../constants/settingsActionTypes';

const initialState = {
    places: [],
    base: {}
}
export default function locationReducer(state=initialState, action) {

    switch (action.type) {
        case actionTypes.SET_HOME_BASE: {
            return {...state, base: action.payload, places: [...state.places.filter(
                place => place.locationType !== 'home_base'), action.payload]};
        }
        default: return state
    }
}