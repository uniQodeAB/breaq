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

it('updates internal state when the value of the input field changes', () => {
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
    },
    showMessage:false
  });

  wrapper.find('input').simulate('change', { target: { value: 'My new value'} });
  expect(wrapper.state()).toEqual({
    client: {
      name: 'My new value',
    },
    showMessage: false
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
  expect(wrapper.state()).toEqual({ client: expectedClient, showMessage: false });

  // Click button and wait for update as onSubmit function is async
  wrapper.find('button').simulate('click');
  await wrapper.update();

  expect(submitClientStub).toBeCalledWith(expectedClient);
  expect(wrapper.state()).toEqual({
    client: {
      name: ''
    },
    showMessage: false
  });
});

it('should show a message and not execute submitClient if the input is empty when button is clicked',
 async () => {
  const submitClientStub:jest.Mock = jest.fn()
  const props:IProps = {
    client: {
      name: ''
    },
    submitClient: submitClientStub
  }
  const wrapper = enzyme.shallow(<AddClient client={props.client} submitClient={props.submitClient}/>);

  // The span should only be rendered when showMessage is true
  expect(wrapper.find('span').length).toEqual(0);

  // Change state
  wrapper.find('input').simulate('change', { target: { value: ''} });
  const expectedClient = {
    name: ''
  };
  // Verify state change
  expect(wrapper.state()).toEqual({ client: expectedClient, showMessage: false });

  // Click button and wait for update as onSubmit function is async
  wrapper.find('button').simulate('click');
  await wrapper.update();

  expect(submitClientStub).not.toHaveBeenCalled();
  expect(wrapper.state()).toEqual({
    client: {
      name: ''
    },
    showMessage: true
  });

  expect(wrapper.find('span').text().length).toBeGreaterThan(0);
});

