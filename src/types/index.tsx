export interface IStoreState {
  client: IClient;
  languageName: string;
  enthusiasmLevel: number;
}

export interface IClient {
  name: string;
}
