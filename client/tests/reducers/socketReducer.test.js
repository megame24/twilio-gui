import socketReducer, { initialState } from '../../src/reducers/socketReducer';
import types from '../../src/actions/actionTypes';

describe('Testing socketReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = socketReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = socketReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = socketReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should set connected to true when LOGIN_LOADING is dispatched', () => {
    const action = { type: `${types.LOGIN}_LOADING`};
    const state = socketReducer(initialState, action);
    expect(state.connected).toEqual(true);
  });
  it('should set isLoading to true when SOCKET_CONNECTED is dispatched', () => {
    const action = { type: types.SOCKET_CONNECTED };
    const state = socketReducer(initialState, action);
    expect(state.connected).toEqual(true);
  });
  it('should set connected to false when LOGIN_FAILURE is dispatched', () => {
    const action = {
      type: `${types.LOGIN}_FAILURE`
    }
    const state = socketReducer(initialState, action);
    expect(state.connected).toEqual(false);
  });
});
