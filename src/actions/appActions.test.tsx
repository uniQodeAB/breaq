import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as constants from '../constants';
import { IClient } from '../types';
​
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { firestore } from '../firebase';

describe('submitClient', () => {
  it('creates CREATE_CLIENT_SUCCESSFUL when creating client is done', async () => {
    const docMock = () => ({
      set: jest.fn()
    });
    const firestoreMock = jest.spyOn(firestore, "collection");
    firestoreMock.mockImplementation(() => {
      return {
        doc: docMock
      }
    });

    const actions = require('./appActions');

    const expectedActions = [
      { type: constants.CREATE_CLIENT },
      { type: constants.CREATE_CLIENT_SUCCESSFUL }
    ]
    const store = mockStore({ todos: [] })
​
    const client:IClient = { id: '', name: 'abc', locations: [] };
    await store.dispatch<any>(actions.createClient(client));
      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  });

 it('creates CREATE_CLIENT_FAILED if creating client fails', async () => {
    const docMock = () => ({
      set: () => {
        throw new Error('Fail');
      }
    });
    const firestoreMock = jest.spyOn(firestore, "collection");
    firestoreMock.mockImplementation(() => {
      return {
        doc: docMock
      }
    });

    const actions = require('./appActions');

    const expectedActions = [
      { type: constants.CREATE_CLIENT },
      { type: constants.CREATE_CLIENT_FAILED, payload: 'Fail' }
    ]
    const store = mockStore({ })
​
    const client:IClient = { id: '', name: 'abc', locations: [] };

    try {
      await store.dispatch<any>(actions.createClient(client));
    } catch (e) {
      // do nothing
    }

      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  });
})
