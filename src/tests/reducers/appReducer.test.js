import reducer, { initialState } from '../../reducers/appReducer';
import * as actions from '../../actions/appActions';

describe('appReducer', () => {
  it('should return the initial state if no matching action', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  function initAddCompany(prevState) {
    return reducer(prevState, {
      type: actions.INIT_ADD_COMPANY
    });
  }
  it(`should handle ${actions.INIT_ADD_COMPANY}`, () => {
    const expectedState = {
      addCompany: true,
      companies: {},
      filter: []
    };

    expect(initAddCompany(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function endAddCompany(prevState) {
    return reducer(prevState, {
      type: actions.END_ADD_COMPANY
    });
  }
  it(`should handle ${actions.END_ADD_COMPANY}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {},
      filter: []
    };

    expect(endAddCompany(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function initEditCompany(prevState) {
    return reducer(prevState, {
      type: actions.INIT_EDIT_COMPANY,
      payload: {
        companyId: 'test id'
      }
    });
  }
  it(`should handle ${actions.INIT_EDIT_COMPANY}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          editCompany: true
        }
      },
      filter: []
    };

    expect(initEditCompany(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function endEditCompany(prevState) {
    return reducer(prevState, {
      type: actions.END_EDIT_COMPANY,
      payload: {
        companyId: 'test id'
      }
    });
  }
  it(`should handle ${actions.END_EDIT_COMPANY}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          editCompany: false
        }
      },
      filter: []
    };

    expect(endEditCompany(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function initAddEmployee(prevState) {
    return reducer(prevState, {
      type: actions.INIT_ADD_EMPLOYEE,
      payload: {
        companyId: 'test id',
        employeeId: 'employee id'
      }
    });
  }
  it(`should handle ${actions.INIT_ADD_EMPLOYEE}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          addEmployee: true
        }
      },
      filter: []
    };

    expect(initAddEmployee(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function endAddEmployee(prevState) {
    return reducer(prevState, {
      type: actions.END_ADD_EMPLOYEE,
      payload: {
        companyId: 'test id',
        employeeId: 'employee id'
      }
    });
  }
  it(`should handle ${actions.END_ADD_EMPLOYEE}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          addEmployee: false
        }
      },
      filter: []
    };

    expect(endAddEmployee(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function initEditEmployee(prevState) {
    return reducer(prevState, {
      type: actions.INIT_EDIT_EMPLOYEE,
      payload: {
        companyId: 'test id',
        employeeId: 'employee id'
      }
    });
  }
  it(`should handle ${actions.INIT_EDIT_EMPLOYEE}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          editEmployee: true,
          editEmployeeId: 'employee id'
        }
      },
      filter: []
    };

    expect(initEditEmployee(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  function endEditEmployee(prevState) {
    return reducer(prevState, {
      type: actions.END_EDIT_EMPLOYEE,
      payload: {
        companyId: 'test id',
        employeeId: 'employee id'
      }
    });
  }
  it(`should handle ${actions.END_EDIT_EMPLOYEE}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {
        'test id': {
          editEmployee: false,
          editEmployeeId: ''
        }
      },
      filter: []
    };

    expect(endEditEmployee(initialState)).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  it(`should handle ${actions.SHOW_COMPANY}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {},
      filter: []
    };

    expect(
      reducer(initialState, {
        type: actions.SHOW_COMPANY,
        payload: {
          companyId: 'test id'
        }
      })
    ).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  it(`should handle ${actions.HIDE_COMPANY}`, () => {
    const expectedState = {
      addCompany: false,
      companies: {},
      filter: ['test id']
    };

    expect(
      reducer(initialState, {
        type: actions.HIDE_COMPANY,
        payload: {
          companyId: 'test id'
        }
      })
    ).toEqual(expectedState);

    expect(expectedState).not.toBe(initialState);
  });

  describe('a simple scenario', () => {
    let state;

    it('1. should handle init add company', () => {
      state = initAddCompany(initialState);

      expect(state).toEqual({
        addCompany: true,
        companies: {},
        filter: []
      });
    });

    it('2. should handle cancel add company', () => {
      state = endAddCompany(state);

      expect(state).toEqual({
        addCompany: false,
        companies: {},
        filter: []
      });
    });

    it('3. should handle init edit company', () => {
      state = initEditCompany(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: true
          }
        },
        filter: []
      });
    });

    it('4. should handle end edit company', () => {
      state = endEditCompany(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false
          }
        },
        filter: []
      });
    });

    it('5. should handle init add employee', () => {
      state = initAddEmployee(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: true
          }
        },
        filter: []
      });
    });

    it('6. should handle end add employee', () => {
      state = endAddEmployee(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: false
          }
        },
        filter: []
      });
    });

    it('7. should handle init edit employee', () => {
      state = initEditEmployee(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: false,
            editEmployee: true,
            editEmployeeId: 'employee id'
          }
        },
        filter: []
      });
    });

    it('8. should handle end edit employee', () => {
      state = endEditEmployee(state);
      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: false,
            editEmployee: false,
            editEmployeeId: ''
          }
        },
        filter: []
      });
    });

    it('8. should handle three consecutive hide company commands', () => {
      state = reducer(state, {
        type: actions.HIDE_COMPANY,
        payload: {
          companyId: 'id1'
        }
      });

      state = reducer(state, {
        type: actions.HIDE_COMPANY,
        payload: {
          companyId: 'id2'
        }
      });

      state = reducer(state, {
        type: actions.HIDE_COMPANY,
        payload: {
          companyId: 'id3'
        }
      });

      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: false,
            editEmployee: false,
            editEmployeeId: ''
          }
        },
        filter: ['id1', 'id2', 'id3']
      });
    });

    it('8. should handle show company action for id2', () => {
      state = reducer(state, {
        type: actions.SHOW_COMPANY,
        payload: {
          companyId: 'id2'
        }
      });

      expect(state).toEqual({
        addCompany: false,
        companies: {
          'test id': {
            editCompany: false,
            addEmployee: false,
            editEmployee: false,
            editEmployeeId: ''
          }
        },
        filter: ['id1', 'id3']
      });
    });
  });
});
