import { COMPLETE, FAIL, INACTIVE, SUBMIT } from '../constants';

export interface IStoreState {
  addClientState: IComponentState;
  deleteClientState: IComponentState;
}

export interface IClient {
  name: string;
}

export interface IFirestoreState {
  firestore: any | null;
}

export interface IComponentState {
  state: INACTIVE | SUBMIT | COMPLETE | FAIL;
  message?: string;
}
