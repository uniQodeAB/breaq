import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as constants from '../constants';
import { IClient } from '../types';
​
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { firestore } from '../firebase';

describe('submitClient', () => {
  it('creates SUBMIT_CLIENT_SUCCESSFUL when submitting client is done', async () => {
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
      { type: constants.SUBMIT_CLIENT },
      { type: constants.SUBMIT_CLIENT_SUCCESSFUL }
    ]
    const store = mockStore({ todos: [] })
​
    const client:IClient = { name: '' };
    await store.dispatch<any>(actions.submitClient(client));
      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  });

 it('creates SUBMIT_CLIENT_FAIL if submitting client fails', async () => {
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
      { type: constants.SUBMIT_CLIENT },
      { type: constants.SUBMIT_CLIENT_FAILED, payload: 'Fail' }
    ]
    const store = mockStore({ })
​
    const client:IClient = { name: '' };
    await store.dispatch<any>(actions.submitClient(client));
      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  });
})
