import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './appActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('appActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should create an action to add a company', () => {
    const expectedAction = [
      {
        type: actions.INIT_ADD_COMPANY
      }
    ];

    store.dispatch(actions.initAddCompany());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to end adding a company', () => {
    const expectedAction = [
      {
        type: actions.END_ADD_COMPANY
      }
    ];

    store.dispatch(actions.endAddCompany());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to init editing a company', () => {
    const expectedAction = [
      {
        type: actions.INIT_EDIT_COMPANY,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.initEditCompany('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to end editing a company', () => {
    const expectedAction = [
      {
        type: actions.END_EDIT_COMPANY,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.endEditCompany('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to init adding an employee', () => {
    const expectedAction = [
      {
        type: actions.INIT_ADD_EMPLOYEE,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.initAddEmployee('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to end adding an employee', () => {
    const expectedAction = [
      {
        type: actions.END_ADD_EMPLOYEE,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.endAddEmployee('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to init editing an employee', () => {
    const expectedAction = [
      {
        type: actions.INIT_EDIT_EMPLOYEE,
        payload: {
          companyId: 'test id',
          employeeId: 'employee id'
        }
      }
    ];

    store.dispatch(actions.initEditEmployee('test id', 'employee id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to end editing an employee', () => {
    const expectedAction = [
      {
        type: actions.END_EDIT_EMPLOYEE,
        payload: {
          companyId: 'test id',
          employeeId: 'employee id'
        }
      }
    ];

    store.dispatch(actions.endEditEmployee('test id', 'employee id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to show a company', () => {
    const expectedAction = [
      {
        type: actions.SHOW_COMPANY,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.showCompany('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to show a company', () => {
    const expectedAction = [
      {
        type: actions.HIDE_COMPANY,
        payload: {
          companyId: 'test id'
        }
      }
    ];

    store.dispatch(actions.hideCompany('test id'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
