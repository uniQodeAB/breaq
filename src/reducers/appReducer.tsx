import { ClientAction } from '../actions';
import { ADD_CLIENT } from '../constants/index';
import { IStoreState } from '../types/index';

export const initialState = {
  client: {
    name: ''
  }
};
export default function appReducer(state: IStoreState = initialState, action: ClientAction): IStoreState {
  switch (action.type) {
    case ADD_CLIENT:
      const client = { ...state.client, name: action.payload.name }
      return { ...state, client };
  }
  return state;
}
