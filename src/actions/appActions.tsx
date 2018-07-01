import { ActionCreator, Dispatch } from 'redux';

import { ThunkAction } from 'redux-thunk';
import { ClientAction } from '.';
import * as constants from '../constants';
import { IClient, IStoreState } from '../types';

export const addClient: ActionCreator<
  ThunkAction<Promise<ClientAction>, IStoreState, void, ClientAction>
> = (client:IClient) => {
  return async (dispatch: Dispatch<ClientAction>): Promise<ClientAction> => {
    return dispatch({
      payload: client,
      type: constants.ADD_CLIENT,
    });
  }
}
