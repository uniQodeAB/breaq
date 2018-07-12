import {
  COMPLETE,
  DELETE_CLIENT,
  DELETE_CLIENT_FAILED,
  DELETE_CLIENT_SUCCESSFUL,
  FAIL,
  INACTIVE,
  SUBMIT,
  SUBMIT_CLIENT,
  SUBMIT_CLIENT_FAILED,
  SUBMIT_CLIENT_SUCCESSFUL
} from '../constants';
import { IStoreState } from '../types';
import reducer from './appReducer';

describe('app reducer', () => {
  let state:IStoreState;

  beforeEach(() => {
    state = {
      addClientState: {
        message: '',
        state: INACTIVE
      },
      deleteClientState: {
        message: '',
        state: INACTIVE
      }
    };
  });

  describe('add client', () => {
    it('should change the state of addClientState to "SUBMIT"', () => {
      const newState = reducer(state, { type: SUBMIT_CLIENT });

      expect(newState.addClientState).toEqual({
        message: '',
        state: SUBMIT
      });

      // original store state should not have changed
      expect(state.addClientState.state).toEqual(INACTIVE);
    });

    it('should change the state of addClientState to "COMPLETE"', () => {
      const newState = reducer(state, { type: SUBMIT_CLIENT_SUCCESSFUL });

      expect(newState.addClientState).toEqual({
        message: '',
        state: COMPLETE
      });

      // original store state should not have changed
      expect(state.addClientState.state).toEqual(INACTIVE);
    });

    it('should change the state of addClientState to "FAIL" with an optional message', () => {
      const newState = reducer(state, {
        payload: 'test',
        type: SUBMIT_CLIENT_FAILED,
      });

      expect(newState.addClientState).toEqual({
          message: 'test',
          state: FAIL
      });

      // original store state should not have changed
      expect(state.addClientState).toEqual({
        message: '',
        state: INACTIVE
      });
    });
  });

  describe('delete client', () => {
    it('should change the state of deleteClientState to "SUBMIT"', () => {
      const newState = reducer(state, { type: DELETE_CLIENT });

      expect(newState.deleteClientState).toEqual({
        message: '',
        state: SUBMIT
      });

      // original store state should not have changed
      expect(state.deleteClientState.state).toEqual(INACTIVE);
    });

    it('should change the state of deleteClientState to "COMPLETE"', () => {
      const newState = reducer(state, { type: DELETE_CLIENT_SUCCESSFUL });

      expect(newState.deleteClientState).toEqual({
        message: '',
        state: COMPLETE
      });

      // original store state should not have changed
      expect(state.deleteClientState.state).toEqual(INACTIVE);
    });

    it('should change the state of deleteClientState to "FAIL" with an optional message', () => {
      const newState = reducer(state, {
        payload: 'test',
        type: DELETE_CLIENT_FAILED,
      });

      expect(newState.deleteClientState).toEqual({
          message: 'test',
          state: FAIL
      });

      // original store state should not have changed
      expect(state.deleteClientState).toEqual({
        message: '',
        state: INACTIVE
      });
    });
  });
});