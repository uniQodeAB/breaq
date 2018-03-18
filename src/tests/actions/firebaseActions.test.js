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
  firestore: {
    collection: () => ({
      doc: () => ({
        collection: () => ({
          doc: () => ({
            set: () =>
              new Promise(resolve => {
                resolve();
              }),
            update: () =>
              new Promise(resolve => {
                resolve();
              }),
            delete: () =>
              new Promise(resolve => {
                resolve();
              })
          })
        })
      })
    })
  },
  login: jest.fn(),
  logout: jest.fn()
}));

describe('firebaseActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should add a company', () =>
    store
      .dispatch(actions.addCompany({ name: 'abc' }))
      .then(() =>
        expect(store.getActions()).toEqual([{ type: 'END_ADD_COMPANY' }])
      ));

  it('should update a company', () =>
    store
      .dispatch(actions.updateCompany({ id: '5678', name: 'def' }))
      .then(() =>
        expect(store.getActions()).toEqual([
          {
            type: 'END_EDIT_COMPANY',
            payload: {
              companyId: '5678'
            }
          }
        ])
      ));

  it('should delete a company', () =>
    store
      .dispatch(actions.deleteCompany({ id: '5678', name: 'def' }))
      .then(() => expect(store.getActions()).toEqual([])));

  it('should add an employee', () => {
    store.dispatch(actions.addEmployee('5678', { name: 'employee' }));
    // Todo add assert
  });

  it('should update an employee', () =>
    store
      .dispatch(
        actions.updateEmployee('5678', { id: '5678', name: 'employee2' })
      )
      .then(() =>
        expect(store.getActions()).toEqual([
          {
            payload: {
              companyId: '5678',
              employeeId: '5678'
            },
            type: 'END_EDIT_EMPLOYEE'
          }
        ])
      ));

  it('should delete an employee', () =>
    store
      .dispatch(actions.deleteEmployee('5678', '5678'))
      .then(() => expect(store.getActions()).toEqual([])));

  it('should login a user', () => {
    store.dispatch(actions.login());

    expect(firebase.login.mock.calls.length).toBe(1);
  });

  it('should logout a user', () => {
    store.dispatch(actions.logout());

    expect(firebase.logout.mock.calls.length).toBe(1);
  });
});
