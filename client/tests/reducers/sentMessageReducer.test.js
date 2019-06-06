import sentMessageReducer, { initialState } from '../../src/reducers/sentMessageReducer';
import types from '../../src/actions/actionTypes';

describe('Testing sentMessageReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = sentMessageReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = sentMessageReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = sentMessageReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should set isLoading to true when NEW_CONTACT_MSG_LOADING is dispatched', () => {
    const action = { type: `${types.NEW_CONTACT_MSG}_LOADING`};
    const state = sentMessageReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });
  it('should set isLoading to true when OLD_CONTACT_MSG_LOADING is dispatched', () => {
    const action = { type: `${types.OLD_CONTACT_MSG}_LOADING`};
    const state = sentMessageReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });
  it('should save an error message to the state when OLD_CONTACT_MSG_FAILURE is dispatched', () => {
    const action = {
      type: `${types.OLD_CONTACT_MSG}_FAILURE`,
      payload: {
        message: 'ERROR!!'
      }
    }
    const state = sentMessageReducer(initialState, action);
    expect(state.errors.message).toEqual(action.payload.message);
  });
  it('should save an error message to the state when NEW_CONTACT_MSG_FAILURE is dispatched', () => {
    const action = {
      type: `${types.NEW_CONTACT_MSG}_FAILURE`,
      payload: {
        message: 'ERROR!!'
      }
    }
    const state = sentMessageReducer(initialState, action);
    expect(state.errors.message).toEqual(action.payload.message);
  });
  it('should set success to true and the "sent to" contact when NEW_CONTACT_MSG_SUCCESS is dispatched', () => {
    const contact = {
      id: 23,
      phoneNumber: 1234567890
    }
    const action = {
      type: `${types.NEW_CONTACT_MSG}_SUCCESS`,
      payload: {
        data: { contact }
      }
    };
    const state = sentMessageReducer(initialState, action);
    expect(state.success).toEqual(true);
    expect(state.sentTo).toEqual(contact);
  });
  it('should set success to true and the "sent to" contact when OLD_CONTACT_MSG_SUCCESS is dispatched', () => {
    const contact = {
      id: 23,
      phoneNumber: 1234567890
    }
    const action = {
      type: `${types.NEW_CONTACT_MSG}_SUCCESS`,
      payload: {
        data: { contact }
      }
    };
    const state = sentMessageReducer(initialState, action);
    expect(state.success).toEqual(true);
    expect(state.sentTo).toEqual(contact);
  });
  it('Should set success to false on RESET_SUCCESS', () => {
    const action = {
      type: types.RESET_SUCCESS
    };
    const state = sentMessageReducer(initialState, action);
    expect(state.success).toEqual(false);
  });
  it('should reset the errors when CLEAR_ERRORS is dispatched', () => {
    const action = { type: types.CLEAR_ERRORS};
    const state = sentMessageReducer(initialState, action);
    expect(state.errors.message).toEqual('');
  });
});
