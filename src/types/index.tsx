export interface IStoreState {
  client: IClient;
}

export interface IClient {
  name: string;
}

export interface IFirestoreState {
  firestore: any | null;
}
