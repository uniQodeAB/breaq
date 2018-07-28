import * as React from 'react';
import { IClient, ILocation } from '../types';

export interface IProps {
  clients?: IClient[];
  deleteClient: (client:IClient) => Promise<void>;
}

const renderLocations = (locations : ILocation[]) => (
  <ol>
    {locations && locations.map((location:ILocation) => (
      <li key={location.id}>{location.address}</li>
    ))}
  </ol>
)

const renderClients = (clients: IClient[], deleteClient: (client:IClient) => Promise<void>) => {
  return clients.map((client) => (
    // tslint:disable-next-line:jsx-no-lambda
    <li key={client.name}>{client.name}{renderLocations(client.locations)}<button onClick={() => deleteClient(client)}>Delete</button></li>
  ));
}

const ListClients:React.SFC<IProps> = ({ clients, deleteClient }:IProps) => {
  return (
    <ul>
      {clients && renderClients(clients, deleteClient) }
    </ul>
  )
}

export default ListClients;

ListClients.defaultProps = {
  clients: []
}
