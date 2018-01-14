import reducer from './settingsReducer';
import * as types from '../actions/settingsActions';

describe('settingsReducer', () => {
  const initialState = {
    editHomeBase: false,
    addMode: false,
    editMode: false,
    employeeId: ''
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${types.INIT_EDIT_HOME_BASE} and ${
    types.CANCEL_EDIT_HOME_BASE
  }`, () => {
    const expectedState1 = {
      editHomeBase: true,
      addMode: false,
      editMode: false,
      employeeId: ''
    };
    const expectedState2 = {
      editHomeBase: false,
      addMode: false,
      editMode: false,
      employeeId: ''
    };

    expect(
      reducer(initialState, {
        type: types.INIT_EDIT_HOME_BASE
      })
    ).toEqual(expectedState1);

    expect(
      reducer(expectedState1, {
        type: types.CANCEL_EDIT_HOME_BASE
      })
    ).toEqual(expectedState2);

    // Should not have changed the original state
    expect(expectedState1.editHomeBase).toBe(true);
  });

  it(`should handle ${types.INIT_ADD_EMPLOYEE}, ${
    types.CANCEL_ADD_EDIT_EMPLOYEE
  } and ${types.INIT_EDIT_EMPLOYEE}`, () => {
    const expectedState1 = {
      editHomeBase: false,
      addMode: true,
      editMode: false,
      employeeId: ''
    };
    const expectedState2 = {
      editHomeBase: false,
      addMode: false,
      editMode: false,
      employeeId: ''
    };
    const expectedState3 = {
      editHomeBase: false,
      addMode: false,
      editMode: true,
      employeeId: 'employee_id'
    };

    expect(
      reducer(initialState, {
        type: types.INIT_ADD_EMPLOYEE
      })
    ).toEqual(expectedState1);

    expect(
      reducer(expectedState1, {
        type: types.CANCEL_ADD_EDIT_EMPLOYEE
      })
    ).toEqual(expectedState2);

    expect(
      reducer(expectedState2, {
        type: types.INIT_EDIT_EMPLOYEE,
        payload: 'employee_id'
      })
    ).toEqual(expectedState3);

    // Should not have changed the original state
    expect(expectedState1.addMode).toBe(true);
    expect(expectedState2.editMode).toBe(false);
  });
});
