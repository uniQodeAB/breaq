import * as constants from '../constants'

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

export interface IDeleteClient {
  type: constants.DETELE_CLIENT;
}

export interface IDeleteClientSuccessful {
  type: constants.DELETE_CLIENT_SUCCESSFUL;
}

export interface IDeleteClientFailed {
  type: constants.DELETE_CLIENT_FAILED;
  payload: string;
}

export type AddClientAction = ISubmitClient | ISubmitClientSuccessful | ISubmitClientFailed;
export type DeleteClientAction = IDeleteClient | IDeleteClientSuccessful | IDeleteClientFailed;

export type AppAction = AddClientAction | DeleteClientAction;

