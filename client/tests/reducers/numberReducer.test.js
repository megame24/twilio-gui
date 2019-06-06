import phoneNumberReducer, { initialState } from '../../src/reducers/phoneNumberReducer';
import types from '../../src/actions/actionTypes';

describe('Testing phoneNumberReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = phoneNumberReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = phoneNumberReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = phoneNumberReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should save the available phoneNumbers when GET_AVAILABLE_PHONE_NUMBERS is dispatched', () => {
    const action = {
      type: `${types.GET_AVAILABLE_PHONE_NUMBERS}_SUCCESS`,
      payload: {
        data: {
          availableNumbers: [1, 2]
        }
      }
    };
    const state = phoneNumberReducer(initialState, action);
    expect(state.availableNums).toEqual([1, 2]);
  });
  it('should set isLoading to true when GET_AVAILABLE_PHONE_NUMBERS_LOADING is dispatched', () => {
    const action = { type: `${types.GET_AVAILABLE_PHONE_NUMBERS}_LOADING`};
    const state = phoneNumberReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });
  it('should save an error message to the state when GET_AVAILABLE_PHONE_NUMBERS_FAILURE is dispatched', () => {
    const action = {
      type: `${types.GET_AVAILABLE_PHONE_NUMBERS}_FAILURE`,
      payload: {
        message: 'ERROR!!'
      }
    }
    const state = phoneNumberReducer(initialState, action);
    expect(state.errors.message).toEqual(action.payload.message);
  });
});
