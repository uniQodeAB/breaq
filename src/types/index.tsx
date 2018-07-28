import { COMPLETE, FAIL, INACTIVE, SUBMIT } from '../constants';

export interface IStoreState {
  addClientState: IComponentState;
  deleteClientState: IComponentState;
}

export interface IClient {
  id: string;
  name: string;
  locations: ILocation[];
}

export interface ILocation {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

export interface IFirestoreState {
  firestore: any | null;
}

export interface IComponentState {
  state: INACTIVE | SUBMIT | COMPLETE | FAIL;
  message?: string;
}
