import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AddClientAction, DeleteClientAction } from 'src/actions';
import * as constants from '../constants';
import { firestore } from '../firebase';
import { IClient, IStoreState } from '../types';

export const submitClient: ActionCreator<
  ThunkAction<Promise<AddClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<AddClientAction>): Promise<AddClientAction> => {
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

export const deleteClient: ActionCreator<
  ThunkAction<Promise<DeleteClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<DeleteClientAction>): Promise<DeleteClientAction> => {
    dispatch({
      type: constants.DETELE_CLIENT
    });

    try {
      await firestore.collection('clients')
        .doc(client.name)
        .delete();

      return dispatch({
        type: constants.DELETE_CLIENT_SUCCESSFUL
      });
    } catch(e) {
      return dispatch({
        payload: e.message,
        type: constants.DELETE_CLIENT_FAILED
      });
    }
  };
};
