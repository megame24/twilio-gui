import authReducer, { initialState } from '../../src/reducers/authReducer';
import types from '../../src/actions/actionTypes';

describe('Testing authReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = authReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = authReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = authReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should save a token to the state upon successful login', () => {
    const action = {
      type: `${types.LOGIN}_SUCCESS`,
      payload: {
        token: 'newtoken',
        user: {}
      }
    }
    const expectedState = {
      ...initialState,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      token: action.payload.token
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
  it('should save a token to the state when persist login action is dispatched', () => {
    const action = {
      type: types.PERSIST_LOGIN,
      payload: {
        token: 'newtoken',
        user: {}
      }
    }
    const expectedState = {
      ...initialState,
      token: action.payload.token,
      user: action.payload.user
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
  it('should set isLoading to true when LOGIN_LOADING is dispatched', () => {
    const action = { type: `${types.LOGIN}_LOADING`};
    const state = authReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });
  it('should set token to an empty string when LOGOUT is dispatched', () => {
    const action = { type: types.LOGOUT};
    const state = authReducer(initialState, action);
    expect(state.token).toEqual('');
  });
  it('should save an error message to the state when LOGIN_FAILURE is dispatched', () => {
    const action = {
      type: `${types.LOGIN}_FAILURE`,
      payload: {
        message: 'ERROR!!'
      }
    }
    const state = authReducer(initialState, action);
    expect(state.errors.message).toEqual(action.payload.message);
  });
  it('should reset the errors when CLEAR_ERRORS is dispatched', () => {
    const action = { type: types.CLEAR_ERRORS};
    const state = authReducer(initialState, action);
    expect(state.errors.message).toEqual('');
  });
});
