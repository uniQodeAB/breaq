import * as React from 'react';
import { IClient } from '../types';

export interface IProps {
  clients?: IClient[]
}

const renderClients = (clients: IClient[]) => {
  return clients.map((client) => <li key={client.name}>{client.name}</li>);
}

const ListClients:React.SFC<IProps> = ({ clients }:IProps) => {
  return (
    <ul>
      {clients && renderClients(clients) }
    </ul>
  )
}

export default ListClients;

ListClients.defaultProps = {
  clients: []
}
