import { COMPLETE, FAIL, INACTIVE, SUBMIT, SUBMIT_CLIENT, SUBMIT_CLIENT_FAILED, SUBMIT_CLIENT_SUCCESSFUL } from '../constants';
import { IStoreState } from '../types';
import reducer from './appReducer';

describe('app reducer', () => {
  let state:IStoreState;

  beforeEach(() => {
    state = {
      addClientState: {
        message: '',
        state: INACTIVE
      }
    };
  })

  it('should change the state of addClientState to "SUBMIT"', () => {
    const newState = reducer(state, { type: SUBMIT_CLIENT });

    expect(newState).toEqual(
      { addClientState: {
        message: '',
        state: SUBMIT
      }
    });

    // original store state should not have changed
    expect(state.addClientState.state).toEqual(INACTIVE);
  });

  it('should change the state of addClientState to "COMPLETE"', () => {
    const newState = reducer(state, { type: SUBMIT_CLIENT_SUCCESSFUL });

    expect(newState).toEqual(
      { addClientState: {
        message: '',
        state: COMPLETE
      }
    });

    // original store state should not have changed
    expect(state.addClientState.state).toEqual(INACTIVE);
  });

  it('should change the state of addClientState to "FAIL" with an optional message', () => {
    const newState = reducer(state, {
      payload: 'test',
      type: SUBMIT_CLIENT_FAILED,
    });

    expect(newState).toEqual(
      { addClientState: {
        message: 'test',
        state: FAIL
      }
    });

    // original store state should not have changed
    expect(state.addClientState).toEqual({
      message: '',
      state: INACTIVE
    });
  });
});