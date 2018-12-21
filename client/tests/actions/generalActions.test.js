import generalActions from '../../src/actions/generalActions';
import types from '../../src/actions/actionTypes';

describe('Testing generalActions', () => {
  it('should dispatch CLEAR_ERRORS when clearErrors is called', () => {
    const action = generalActions.clearErrors();
    expect(action).toEqual({
      type: types.CLEAR_ERRORS,
    });
  });
  it('should dispatch RESET_SUCCESS when resetSuccess is called', () => {
    const action = generalActions.resetSuccess();
    expect(action).toEqual({
      type: types.RESET_SUCCESS,
    });
  });
});
