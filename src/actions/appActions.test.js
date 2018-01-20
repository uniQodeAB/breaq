import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './appActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('appActions', () => {
  it('should create an action to edit home base', () => {
    const expectedAction = [
      {
        type: actions.INIT_EDIT_HOME_BASE
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.initEditHomeBase());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to cancel edit home base', () => {
    const expectedAction = [
      {
        type: actions.CANCEL_EDIT_HOME_BASE
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.cancelEditHomeBase());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to add an employee', () => {
    const expectedAction = [
      {
        type: actions.INIT_ADD_EMPLOYEE
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.initAddEmployee());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to cancel add or edit of an employee', () => {
    const expectedAction = [
      {
        type: actions.CANCEL_ADD_EDIT_EMPLOYEE
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.cancelAddEditEmployee());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to edit an employee', () => {
    const expectedAction = [
      {
        type: actions.INIT_EDIT_EMPLOYEE
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.initEditEmployee());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
