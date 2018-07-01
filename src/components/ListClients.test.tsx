import * as enzyme from 'enzyme';
import * as React from 'react';
import ListClients, { IProps } from './ListClients';

it('renders an empty list if there are no clients', () => {
  const props:IProps = {
    clients: []
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(0);
});

it('renders an empty list, and does not fail, if the clients are undefined', () => {
  const props:IProps = {
    clients: undefined,
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(0);
});

it('renders a list of clients', () => {
  const props:IProps = {
    clients: [{
      name: 'abc'
    }, {
      name: 'def'
    }, {
      name: 'ghi'
    }]
  }
  const listClients = enzyme.shallow(<ListClients { ...props }/>);
  expect(listClients.find('ul').children().length).toEqual(3);

  const lis = listClients.find('li');
  expect(lis.get(0).props.children).toEqual('abc');
  expect(lis.get(1).props.children).toEqual('def');
  expect(lis.get(2).props.children).toEqual('ghi');
});

/* it('Updates internal state when the value of the input field changes', () => {
  const props:IProps = {
    client: {
      name: ''
    },
    submitClient: jest.fn()
  }
  const wrapper = enzyme.shallow(<AddClient { ...props }/>);
  expect(wrapper.state()).toEqual({
    client: {
      name: ''
    }
  });

  wrapper.find('input').simulate('change', { target: { value: 'My new value'} });
  expect(wrapper.state()).toEqual({
    client: {
      name: 'My new value'
    }
  });
});

it('renders a button that executes submitClient and clears state when clicked', async () => {
  const submitClientStub:jest.Mock = jest.fn()
  const props:IProps = {
    client: {
      name: ''
    },
    submitClient: submitClientStub
  }
  const wrapper = enzyme.shallow(<AddClient client={props.client} submitClient={props.submitClient}/>);

  // Change state
  wrapper.find('input').simulate('change', { target: { value: 'My new value'} });
  const expectedClient = {
    name: 'My new value'
  };
  // Verify state change
  expect(wrapper.state()).toEqual({ client: expectedClient });

  // Click button and wait for update as onSubmit function is async
  wrapper.find('button').simulate('click');
  await wrapper.update();

  expect(submitClientStub).toBeCalledWith(expectedClient);
  expect(wrapper.state()).toEqual({
    client: {
      name: ''
    }
  });

}); */

