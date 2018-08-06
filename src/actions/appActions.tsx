import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { CreateClientAction, DeleteClientAction, UpdateClientAction } from 'src/actions';
import * as constants from '../constants';
import { firestore } from '../firebase';
import { IClient, IStoreState } from '../types';

export const createClient: ActionCreator<
  ThunkAction<Promise<CreateClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<CreateClientAction>): Promise<CreateClientAction> => {
    dispatch({
      type: constants.CREATE_CLIENT
    });

    try {
      if (!client || !client.name) {
        throw new Error('Client name is empty');
      }

      const doc = await firestore.collection(`clients`).doc();
      client.id = doc.id;

      await doc.set({ client });

      return dispatch({
        type: constants.CREATE_CLIENT_SUCCESSFUL
      });
    } catch(e) {
      dispatch({
        payload: e.message,
        type: constants.CREATE_CLIENT_FAILED
      });
      throw e;
    }
  };
};

export const updateClient: ActionCreator<
  ThunkAction<Promise<UpdateClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<UpdateClientAction>): Promise<UpdateClientAction> => {
    dispatch({
      type: constants.UPDATE_CLIENT
    });

    try {
      const clientDoc = await firestore.doc(`clients/${client.id}`).get();

      await clientDoc.ref.update({ client });

      return dispatch({
        type: constants.UPDATE_CLIENT_SUCCESSFUL
      });
    } catch(e) {
      dispatch({
        payload: e.message,
        type: constants.UPDATE_CLIENT_FAILED
      });
      throw e;
    }
  };
};

export const deleteClient: ActionCreator<
  ThunkAction<Promise<DeleteClientAction>, IStoreState, void, Action>
> = (client:IClient) => {
  return async (dispatch: Dispatch<DeleteClientAction>): Promise<DeleteClientAction> => {
    dispatch({
      type: constants.DELETE_CLIENT
    });

    try {
      await firestore.doc(`clients/${client.id}`).delete();

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
