import * as enzyme from 'enzyme';
import * as React from 'react';
import { IClient, ILocation } from '../types';
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

  it('should toggle visibility of the LocationSearchBox when clicking "Add location" button', () => {
    expect(addClient.find('LocationSearchBox')).toHaveLength(0);

    addClient.find('#add-location').simulate('click');
    expect(addClient.find('LocationSearchBox')).toHaveLength(1);

    addClient.find('#add-location').simulate('click');
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

    it('onSelect callback from Autocomplete should toggle update button', async () => {
      expect(addClient.find('#update-client')).toHaveLength(0);
      expect(addClient.find('#create-client')).toHaveLength(1);

      const onClientSelect:any = addClient.find('Autocomplete').props().onSelect!;

      await onClientSelect({}, {
        suggestion: {
          id: '123',
          name: 'abc'
        }
      });

      const state:any = addClient.state();

      expect(state.update).toBe(true);

      addClient.update();

      expect(addClient.find('#update-client')).toHaveLength(1);
      expect(addClient.find('#create-client')).toHaveLength(0);
    });
  });

  describe('LocationSearchBox', () => {
    beforeEach(() => {
      addClient.setState({
        ...addClient.state(),
        addLocation: true
      });
    });

    afterEach(() => {
      addClient.setState({
        ...addClient.state(),
        addLocation: false
      });
    });

    it('should show LocationSearchBox if the "Add location" button is clicked', () => {
      addClient.setState({
        ...addClient.state(),
        addLocation: false
      });
      expect(addClient.find('LocationSearchBox')).toHaveLength(0);

      addClient.find('#add-location').simulate('click');

      expect(addClient.find('Autocomplete')).toHaveLength(1);
      expect(addClient.find('LocationSearchBox')).toHaveLength(1);
    });

    it('should render LocationSearchBox with props', () => {
      expect(addClient.find('LocationSearchBox').props()).toEqual({
        onChange: expect.any(Function),
        placeholder: expect.any(String),
      })
    });

    it('updates state when location change in LocationSearchBox', () => {
      const onLocationChange:any = addClient.find('LocationSearchBox').props().onChange!;

      const newLoc:ILocation = {
        address: 'abc',
        id: '123',
        lat: 112,
        lng: 358
      };

      onLocationChange(newLoc);

      const state:any = addClient.state();
      const { location } = state;

      expect(location).toEqual(newLoc);
    });

    it('adds location to client and clears location in state when location is saved', () => {
      const newLoc:ILocation = {
        address: 'abc',
        id: '123',
        lat: 112,
        lng: 358
      };

      addClient.setState({
        ...addClient.state(),
        location: newLoc
      });

      let state:any = addClient.state();
      let client:IClient = state.client;

      expect(client.locations).toHaveLength(0);

      addClient.find('#save-location').simulate('click');

      state = addClient.state();
      client = state.client;
      const location = state.location;

      expect(client.locations).toEqual([ newLoc ]);
      expect(location).toEqual({
        address: '',
        id: '',
        lat: NaN,
        lng: NaN,
      });
    });

    it('can add several locations to a client', () => {
      const loc1:ILocation = { address: 'abc', id: '123', lat: 112, lng: 358 };
      const loc2:ILocation = { address: 'def', id: '456', lat: 132, lng: 134 };
      const loc3:ILocation = { address: 'ghi', id: '789', lat: 558, lng: 999 };

      addClient.setState({
        ...addClient.state(),
        location: loc1
      });
      addClient.find('#save-location').simulate('click');

      addClient.setState({
        ...addClient.state(),
        addLocation: true,
        location: loc2,
      });
      addClient.find('#save-location').simulate('click');

      addClient.setState({
        ...addClient.state(),
        addLocation: true,
        location: loc3
      });
      addClient.find('#save-location').simulate('click');

      const state:any = addClient.state();
      const client:IClient = state.client;

      expect(client.locations).toEqual([ loc1, loc2, loc3 ]);
    });

    it('should remove a location if the remove location button is clicked', () => {
      const loc1:ILocation = { address: 'abc', id: '123', lat: 112, lng: 358 };
      const loc2:ILocation = { address: 'def', id: '456', lat: 132, lng: 134 };

      let state:any = addClient.state();

      addClient.setState({
        ...state,
        client: {
          ...state.client,
          locations: [ loc1, loc2 ]
        }
      });

      addClient.find('#locations').find('button').at(1).simulate('click');

      state = addClient.state();

      expect(state.client.locations).toEqual([ loc1 ]);
    });
  });

  it('should show a message if create client fails',
  async () => {
    const createClientShouldFail = jest.fn(() => { throw new Error('fail'); });

    addClient = enzyme.shallow(<AddClient { ...props } createClient={createClientShouldFail} />);

    // The span should only be rendered when showMessage is true
    expect(addClient.find('span').length).toEqual(0);

    // Verify state change
    expect(addClient.state()).toEqual({ ...addClient.state(), message: '' });

    // Click button and wait for update as onSubmit function is async
    addClient.find('#create-client').simulate('click');
    await addClient.update();

    expect(addClient.state()).toEqual({
      ...addClient.state(),
      message: 'fail'
    });

    // Should show a span with the message
    expect(addClient.find('span').text()).toEqual('fail');
  });
});
