import messageActions from '../../src/actions/messageActions';
import types from '../../src/actions/actionTypes';

describe('Testing messageActions', () => {
  it('should dispatch NEW_CONTACT_MSG when messageNewContact is called', () => {
    const action = messageActions.messageNewContact();
    expect(action).toEqual({
      type: types.NEW_CONTACT_MSG,
      payload: 'post',
    });
  });
  it('should dispatch OLD_CONTACT_MSG when messageOldContact is called', () => {
    const action = messageActions.messageOldContact();
    expect(action).toEqual({
      type: types.OLD_CONTACT_MSG,
      payload: 'post',
    });
  });
});
