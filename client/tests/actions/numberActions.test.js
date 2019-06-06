import phoneNumberActions from '../../src/actions/phoneNumberActions';
import types from '../../src/actions/actionTypes';

describe('Testing phoneNumberActions', () => {
  it('should dispatch GET_AVAILABLE_PHONE_NUMBERS when getAvailableNums is called', () => {
    const action = phoneNumberActions.getAvailableNums();
    expect(action).toEqual({
      type: types.GET_AVAILABLE_PHONE_NUMBERS,
      payload: 'get',
    });
  });
});
