import authActions from '../../src/actions/authActions';
import types from '../../src/actions/actionTypes';

describe('Testing authActions', () => {
  it('should dispatch LOGIN when login is called', () => {
    const action = authActions.login();
    expect(action).toEqual({
      type: types.LOGIN,
      payload: 'post',
    });
  });
  it('should dispatch LOGOUT when logout is called', () => {
    const action = authActions.logout();
    expect(action).toEqual({
      type: types.LOGOUT
    });
  });
  it('should dispatch GET_AVAILABLE_PHONE_NUMBERS when getAvailableNums is called', () => {
    const action = authActions.getAvailableNums();
    expect(action).toEqual({
      type: types.GET_AVAILABLE_PHONE_NUMBERS,
      payload: 'get',
    });
  });
});
