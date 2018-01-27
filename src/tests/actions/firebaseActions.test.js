import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../actions/firebaseActions';
import firebase from '../../firebase';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: {
      uid: '1234'
    }
  },
  ref: jest.fn()
}));

describe('firebaseActions', () => {
  let store;
  let mockUpdate;
  let mockRemove;

  beforeEach(() => {
    store = mockStore({});

    const mockPush = jest.fn(() => ({ key: '5678' }));
    mockUpdate = jest.fn(
      () =>
        new Promise(resolve => {
          resolve();
        })
    );
    mockRemove = jest.fn();
    const mockRef = jest.fn(() => ({
      push: mockPush,
      update: mockUpdate,
      remove: mockRemove
    }));

    firebase.ref.mockReturnValue(mockRef());
  });

  it('should add a company', () => {
    store.dispatch(actions.addCompany({ name: 'abc' }));

    expect(mockUpdate.mock.calls[0][0]).toEqual({
      id: '5678',
      name: 'abc'
    });
  });

  it('should update a company', () => {
    store.dispatch(actions.updateCompany({ id: '5678', name: 'def' }));

    expect(mockUpdate.mock.calls[0][0]).toEqual({
      id: '5678',
      name: 'def'
    });
  });

  it('should delete a company', () => {
    store.dispatch(actions.deleteCompany({ id: '5678', name: 'def' }));

    expect(mockRemove.mock.calls.length).toEqual(1);
  });

  it('should add an employee', () => {
    store.dispatch(actions.addEmployee('5678', { name: 'employee' }));

    expect(mockUpdate.mock.calls[0][0]).toEqual({
      id: '5678',
      name: 'employee'
    });
  });

  it('should update an employee', () => {
    store.dispatch(
      actions.updateEmployee('5678', { id: '5678', name: 'employee2' })
    );

    expect(mockUpdate.mock.calls[0][0]).toEqual({
      id: '5678',
      name: 'employee2'
    });
  });

  it('should delete an employee', () => {
    store.dispatch(actions.deleteEmployee('5678', '5678'));

    expect(mockRemove.mock.calls.length).toEqual(1);
  });
});
