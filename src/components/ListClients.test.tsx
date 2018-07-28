import * as enzyme from 'enzyme';
import * as React from 'react';
import ListClients, { IProps } from './ListClients';

it('renders an empty list if there are no clients', () => {
  const props:IProps = {
    clients: [],
    deleteClient: jest.fn()
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(0);
});

it('renders an empty list, and does not fail, if the clients are undefined', () => {
  const props:IProps = {
    clients: undefined,
    deleteClient: jest.fn()
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(0);
});

it('renders a list of clients with buttons', () => {
  const props:IProps = {
    clients: [{
      id: '123',
      locations: [],
      name: 'abc'
    }, {
      id: '456',
      locations: [],
      name: 'def'
    }, {
      id: '789',
      locations: [],
      name: 'ghi'
    }],
    deleteClient: jest.fn()
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(3);
  expect(listClients.find('li').find('button').length).toEqual(3);

  const lis = listClients.find('li');
  expect(lis.get(0).key).toEqual('abc');
  expect(lis.get(1).key).toEqual('def');
  expect(lis.get(2).key).toEqual('ghi');
});

it('calls the `deleteClient` method for the selected client when button clicked', async () => {
  const props:IProps = {
    clients: [{
      id: '123',
      locations: [],
      name: 'abc'
    }, {
      id: '456',
      locations: [],
      name: 'def'
    }, {
      id: '789',
      locations: [],
      name: 'ghi'
    }],
    deleteClient: jest.fn()
  }

  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  const button = listClients.find('li').at(1).find('button');

  button.simulate('click');
  await listClients.update();

  expect(props.deleteClient).toBeCalledWith({
    id: '456',
    locations: [],
    name: 'def'
  });

});
