import * as constants from '../constants'

export interface ICreateClient {
  type: constants.CREATE_CLIENT;
}
export interface ICreateClientSuccessful {
  type: constants.CREATE_CLIENT_SUCCESSFUL;
}
export interface ICreateClientFailed {
  type: constants.CREATE_CLIENT_FAILED;
  payload: string;
}

export interface IDeleteClient {
  type: constants.DELETE_CLIENT
}
export interface IDeleteClientSuccessful {
  type: constants.DELETE_CLIENT_SUCCESSFUL;
}
export interface IDeleteClientFailed {
  type: constants.DELETE_CLIENT_FAILED;
  payload: string;
}

export interface IUpdateClient {
  type: constants.UPDATE_CLIENT;
}
export interface IUpdateClientSuccessful {
  type: constants.UPDATE_CLIENT_SUCCESSFUL;
}
export interface IUpdateClientFailed {
  type: constants.UPDATE_CLIENT_FAILED;
}

export type CreateClientAction = ICreateClient | ICreateClientSuccessful | ICreateClientFailed;
export type DeleteClientAction = IDeleteClient | IDeleteClientSuccessful | IDeleteClientFailed;
export type UpdateClientAction = IUpdateClient | IUpdateClientSuccessful | IUpdateClientFailed;

export type AppAction = CreateClientAction | DeleteClientAction | UpdateClientAction;

