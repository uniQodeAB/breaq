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

export type ClientAction = ISubmitClient | ISubmitClientSuccessful | ISubmitClientFailed;


