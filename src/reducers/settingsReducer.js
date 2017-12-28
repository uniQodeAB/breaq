import {
  SET_HOME_BASE,
  SET_USER_AT_BASE,
  SHOW_USER_ADDRESS,
  SET_USER_ADDRESS,
  EDIT_HOME_BASE,
  CANCEL_EDIT_HOME_BASE
} from '../actions/settingsActions';

const initialState = {
  places: [],
  base: {},
  editingHomeBase: false
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
    case EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: true };
    }
    case CANCEL_EDIT_HOME_BASE: {
      return { ...state, editingHomeBase: false };
    }
    default:
      return state;
  }
}
