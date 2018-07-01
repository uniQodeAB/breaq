import * as enzyme from 'enzyme';
import * as React from 'react';
import AddClient, { IProps } from './AddClient';


it('renders an empty input when the client name is empty', () => {
  const props:IProps = {
    client: {
      name: ''
    },
    submitClient: jest.fn()
  }
  const addClient = enzyme.shallow(<AddClient { ...props }/>);
  expect(addClient.find('input').text()).toEqual('');
});

it('Updates internal state when the value of the input field changes', () => {
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

});

