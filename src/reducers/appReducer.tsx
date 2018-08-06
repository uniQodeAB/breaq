import { AppAction } from '../actions';
import {
  COMPLETE,
  CREATE_CLIENT,
  CREATE_CLIENT_FAILED,
  CREATE_CLIENT_SUCCESSFUL,
  DELETE_CLIENT,
  DELETE_CLIENT_FAILED,
  DELETE_CLIENT_SUCCESSFUL,
  FAIL,
  INACTIVE,
  SUBMIT
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
    case CREATE_CLIENT:
      return {
        ...state,
        addClientState: {
          ...state.addClientState,
          message: '',
          state: SUBMIT,
        }
      };
    case CREATE_CLIENT_SUCCESSFUL:
      return {
        ...state,
        addClientState: {
          ...state.addClientState,
          message: '',
          state: COMPLETE,

        }
      };
    case CREATE_CLIENT_FAILED:
      return {
        ...state,
        addClientState: {
          ...state.addClientState,
          message: action.payload,
          state: FAIL
        }
      };
    case DELETE_CLIENT:
      return {
        ...state,
        deleteClientState: {
          ...state.deleteClientState,
          state: SUBMIT
        }
      };
      case DELETE_CLIENT_SUCCESSFUL:
      return {
        ...state,
        deleteClientState: {
          ...state.deleteClientState,
          state: COMPLETE
        }
      }
      case DELETE_CLIENT_FAILED:
      return {
        ...state,
        deleteClientState: {
          ...state.deleteClientState,
          message: action.payload,
          state: FAIL
        }
      }
  }
  return state;
}
