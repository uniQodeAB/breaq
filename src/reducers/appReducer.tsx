import { AppAction } from '../actions';
import {
  COMPLETE,
  FAIL,
  INACTIVE,
  SUBMIT,
  SUBMIT_CLIENT,
  SUBMIT_CLIENT_FAILED,
  SUBMIT_CLIENT_SUCCESSFUL
} from '../constants';
import { IStoreState } from '../types/index';


export const initialState:IStoreState = {
  addClientState: {
    message: '',
    state: INACTIVE
  },
  deleteClientState: {
    message: '',
    state: INACTIVE
  }
};
export default function appReducer(state: IStoreState = initialState, action: AppAction): IStoreState {
  switch (action.type) {
    case SUBMIT_CLIENT:
      return {
        ...state,
        addClientState: {
          ...state.addClientState,
          message: '',
          state: SUBMIT,
        }
      };
    case SUBMIT_CLIENT_SUCCESSFUL:
      return {
        ...state, addClientState: {
          ...state.addClientState,
          message: '',
          state: COMPLETE,

        }
      };
    case SUBMIT_CLIENT_FAILED:
      return {
        ...state, addClientState: {
          ...state.addClientState,
          message: action.payload,
          state: FAIL
        }
      };
  }
  return state;
}
