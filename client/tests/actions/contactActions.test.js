import contactActions from '../../src/actions/contactActions';
import types from '../../src/actions/actionTypes';

describe('Testing contactActions', () => {
  it('should dispatch GET_CONTACTS when getContacts is called', () => {
    const action = contactActions.getContacts();
    expect(action).toEqual({
      type: types.GET_CONTACTS,
      payload: 'get',
    });
  });
  it('should dispatch GET_CONTACT when getContact is called', () => {
    const action = contactActions.getContact();
    expect(action).toEqual({
      type: types.GET_CONTACT,
      payload: 'get',
    });
  });
  it('should dispatch GET_CONTACT_TO_BE_UPDATED when getContactToBeUpdated is called', () => {
    const action = contactActions.getContactToBeUpdated();
    expect(action).toEqual({
      type: types.GET_CONTACT_TO_BE_UPDATED,
      payload: 'get',
    });
  });
  it('should dispatch GET_CONTACT_MESSAGES when getContactMessages is called', () => {
    const action = contactActions.getContactMessages();
    expect(action).toEqual({
      type: types.GET_CONTACT_MESSAGES,
      payload: 'get',
    });
  });
  it('should dispatch APPEND_TO_CONTACT_MESSAGES when appendToContactMessages is called', () => {
    const action = contactActions.appendToContactMessages('message');
    expect(action).toEqual({
      type: types.APPEND_TO_CONTACT_MESSAGES,
      payload: 'message',
    });
  });
  it('should dispatch UPDATE_CONTACT when updateContact is called', () => {
    const action = contactActions.updateContact();
    expect(action).toEqual({
      type: types.UPDATE_CONTACT,
      payload: 'put',
    });
  });
  it('should dispatch CLEAR_ACTIVE_CONTACT when clearActiveContact is called', () => {
    const action = contactActions.clearActiveContact();
    expect(action).toEqual({
      type: types.CLEAR_ACTIVE_CONTACT,
    });
  });
});
