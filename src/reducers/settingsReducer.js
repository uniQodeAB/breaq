import {
  SET_HOME_BASE,
  SET_USER_AT_BASE,
  SHOW_USER_ADDRESS,
  SET_USER_ADDRESS
} from '../actions/settingsActions';

const initialState = {
  places: [],
  base: {}
};
export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOME_BASE: {
      return {
        ...state,
        base: action.payload,
        places: [
          ...state.places.filter(place => place.locationType !== 'home_base'),
          action.payload
        ]
      };
    }

    case SET_USER_AT_BASE: {
      return { ...state, isUserAtBase: true };
    }
    case SHOW_USER_ADDRESS: {
      return { ...state, isUserAtBase: false, showSearchBox: true };
    }
    case SET_USER_ADDRESS: {
      return { ...state, isUserAtBase: false, userAddress: action.payload };
    }
    default:
      return state;
  }
}
