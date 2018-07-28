import * as enzyme from 'enzyme';
import * as React from 'react';
import AddClient, { IProps } from './AddClient';

jest.mock('../containers/ClientAutocomplete', () => {
  return {
    default: 'Autocomplete'
  }
});

jest.mock('./LocationSearchBox', () => {
  return {
    default: 'LocationSearchBox'
  }
});

jest.mock('../firebase', () => {
  return {
    firestore: {
      doc: (path:string) => ({
        get: () => ({
          data: () => ({
            client: {
              id: 'clientid',
              locations: [{
                address: 'address',
                id: 'addressid',
                lat: 112,
                lng: 358
              }],

              name: 'abc',
            }
          }),
          exists: true,
        })
      })
    }
  }
})

describe('AddClient', () => {
  let props:IProps;
  let addClient:enzyme.ShallowWrapper;

  beforeEach(() => {
    props = {
      createClient: jest.fn(),
      updateClient: jest.fn(),
    }

    addClient = enzyme.shallow(<AddClient { ...props }/>);
  })

  it('initially renders an AutoComplete without the LocationSearchBox', () => {
    expect(addClient.find('Autocomplete')).toHaveLength(1);
    expect(addClient.find('LocationSearchBox')).toHaveLength(0);
  });

  describe('Autocomplete', () => {
    it('should render Autocomplete with props', () => {
      expect(addClient.find('Autocomplete').props()).toEqual({
        onChange: expect.any(Function),
        onSelect: expect.any(Function),
        placeholder: expect.any(String),
        value: '',
      })
    });

    it('update client name in state on onChange callback from Autocomplete', () => {
      const onAutocompleteChange:any = addClient.find('Autocomplete').props().onChange!;

      let state:any = addClient.state();
      expect(state.client.name).toHaveLength(0);

      onAutocompleteChange('test');

      state = addClient.state();
      expect(state.client.name).toEqual('test');
    });

    it('update client on onSelect callback from Autocomplete', async () => {
      const onClientSelect:any = addClient.find('Autocomplete').props().onSelect!;

      let state:any = addClient.state();

      expect(state.client).toEqual({
        id: '',
        locations:
        [ ],
        name: ''
      });

      await onClientSelect({}, {
        suggestion: {
          id: '123',
          name: 'abc'
        }
      });

      state = addClient.state();

      expect(state.client).toEqual({
        id: 'clientid',
        locations:
        [ { address: 'address', id: 'addressid', lat: 112, lng: 358 } ],
        name: 'abc'
      });
    });
  });

  describe('LocationSearchBox', () => {
    it('should show LocationSearchBox if the "Add location" button is clicked', () => {
      addClient.find('#add-location').simulate('click');

      expect(addClient.find('Autocomplete')).toHaveLength(1);
      expect(addClient.find('LocationSearchBox')).toHaveLength(1);
    });

    it('should render LocationSearchBox with props', () => {
      addClient.setState({
        ...addClient.state,
        addLocation: true
      });

      expect(addClient.find('LocationSearchBox').props()).toEqual({
        onChange: expect.any(Function),
        placeholder: expect.any(String),
      })
    });
  });
});

/*
it('renders a button that executes submitClient and clears state when clicked', async () => {
  const submitClientStub:jest.Mock = jest.fn()
  const props:IProps = {
    createClient: submitClientStub,
    updateClient: jest.fn(),
  }
  const wrapper = enzyme.shallow(<AddClient {...props} />);

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
    createClient: submitClientStub,
    updateClient: jest.fn()
  }
  const wrapper = enzyme.shallow(<AddClient { ...props } />);

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
*/
