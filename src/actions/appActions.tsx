import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ClientAction } from 'src/actions';
import * as constants from '../constants';
import { firestore } from '../firebase';
import { IClient, IStoreState } from '../types';

export const submitClient: ActionCreator<
  ThunkAction<Promise<ClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<ClientAction>): Promise<ClientAction> => {
    dispatch({
      type: constants.SUBMIT_CLIENT
    });

    try {
      await firestore.collection('clients')
        .doc(client.name)
        .set({ client });

      return dispatch({
        type: constants.SUBMIT_CLIENT_SUCCESSFUL
      });
    } catch(e) {
      return dispatch({
        payload: e.message,
        type: constants.SUBMIT_CLIENT_FAILED
      });
    }
  };
};
