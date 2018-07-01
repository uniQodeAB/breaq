import * as constants from '../constants'
import { IClient } from '../types';

export interface IAddClient {
  type: constants.ADD_CLIENT;
  payload: IClient,
}

export type AppAction = IAddClient;

export interface ISubmitClient {
  type: constants.SUBMIT_CLIENT;
}

export interface ISubmitClientSuccessful {
  type: constants.SUBMIT_CLIENT_SUCCESSFUL;
}

export interface ISubmitClientFailed {
  type: constants.SUBMIT_CLIENT_FAILED;
  payload: string;
}

export type ClientAction =
  IAddClient | ISubmitClient | ISubmitClientSuccessful | ISubmitClientFailed;

export type FirebaseAction = ISubmitClient | ISubmitClientSuccessful | ISubmitClientFailed;


