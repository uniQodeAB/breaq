import { ClientAction } from '../actions';
import { IStoreState } from '../types/index';

export const initialState = {
  client: {
    name: ''
  }
};
export default function appReducer(state: IStoreState = initialState, action: ClientAction): IStoreState {
  switch (action.type) {

  }
  return state;
}
