import {
  initialContactsState, contacts, initialActiveContactState, activeContact,
  initialContactMessages, contactMessages, initialUpdateContactState, contactUpdate
} from '../../src/reducers/contactReducer';
import types from '../../src/actions/actionTypes';

describe('Testing contactReducer', () => {
  describe('Testing contacts reducer', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = contacts(initialContactsState);
      expect(state).toEqual(initialContactsState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = contacts();
      expect(state).toEqual(initialContactsState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = contacts(initialContactsState, { type: 'INVALID' });
      expect(state).toEqual(initialContactsState);
    });
    it('should set isLoading to true when GET_CONTACTS_LOADING is dispatched', () => {
      const action = { type: `${types.GET_CONTACTS}_LOADING`};
      const state = contacts(initialContactsState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when GET_CONTACTS_FAILURE is dispatched', () => {
      const action = {
        type: `${types.GET_CONTACTS}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = contacts(initialContactsState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('Should save the contacts on GET_CONTACTS_SUCCESS', () => {
      const contact1 = {
        id: 1,
        phoneNumber: 12345,
      };
      const contact2 = {
        id: 2,
        phoneNumber: 12341,
      }
      const action = {
        type: `${types.GET_CONTACTS}_SUCCESS`,
        payload: {
          data: {
            contactList: [
              contact1,
              contact2
            ]
          }
        }
      }
      const state = contacts(initialContactsState, action);
      expect(state.contacts).toEqual({
        1: contact1, 2: contact2
      });
    });
  });
  describe('Testing activeContact reducer', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = activeContact(initialActiveContactState);
      expect(state).toEqual(initialActiveContactState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = activeContact();
      expect(state).toEqual(initialActiveContactState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = activeContact(initialActiveContactState, { type: 'INVALID' });
      expect(state).toEqual(initialActiveContactState);
    });
    it('should set isLoading to true when GET_CONTACT_LOADING is dispatched', () => {
      const action = { type: `${types.GET_CONTACT}_LOADING`};
      const state = activeContact(initialActiveContactState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when GET_CONTACT_FAILURE is dispatched', () => {
      const action = {
        type: `${types.GET_CONTACT}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = activeContact(initialActiveContactState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true when GET_CONTACT_NOT_ACTIVE_LOADING is dispatched', () => {
      const action = { type: `${types.GET_CONTACT_TO_BE_UPDATED}_LOADING`};
      const state = activeContact(initialActiveContactState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when GET_CONTACT_NOT_ACTIVE_FAILURE is dispatched', () => {
      const action = {
        type: `${types.GET_CONTACT_TO_BE_UPDATED}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = activeContact(initialActiveContactState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('Should save the contact on GET_CONTACT_SUCCESS', () => {
      const action = {
        type: `${types.GET_CONTACT}_SUCCESS`,
        payload: {
          data: {
            user: {}
          }
        }
      }
      const state = activeContact(initialActiveContactState, action);
      expect(state.activeContact).toEqual(action.payload.data.user);
    });
    it('Should save the contact on GET_CONTACT_NOT_ACTIVE_SUCCESS', () => {
      const action = {
        type: `${types.GET_CONTACT_TO_BE_UPDATED}_SUCCESS`,
        payload: {
          data: {
            user: {}
          }
        }
      }
      const state = activeContact(initialActiveContactState, action);
      expect(state.contactToBeUpdated).toEqual(action.payload.data.user);
    });
    it('Should reset the active contact when CLEAR_ACTIVE_CONTACT is dispatched', () => {
      const action = {
        type: types.CLEAR_ACTIVE_CONTACT
      }
      const state = activeContact(initialActiveContactState, action);
      expect(state.activeContact).toEqual({
        name: '',
        phoneNumber: '',
      });
    });
  });
  describe('Testing contactMessages reducer', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = contactMessages(initialContactMessages);
      expect(state).toEqual(initialContactMessages);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = contactMessages();
      expect(state).toEqual(initialContactMessages);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = contactMessages(initialContactMessages, { type: 'INVALID' });
      expect(state).toEqual(initialContactMessages);
    });
    it('should set isLoading to true when GET_CONTACTS_LOADING is dispatched', () => {
      const action = { type: `${types.GET_CONTACT_MESSAGES}_LOADING`};
      const state = contactMessages(initialContactMessages, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when GET_CONTACT_MESSAGES_FAILURE is dispatched', () => {
      const action = {
        type: `${types.GET_CONTACT_MESSAGES}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = contactMessages(initialContactMessages, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('Should save the messages on GET_CONTACT_MESSAGES_SUCCESS', () => {
      const message1 = {
        id: 1,
        message: 'hello',
      };
      const message2 = {
        id: 2,
        message: 'hi',
      }
      const action = {
        type: `${types.GET_CONTACT_MESSAGES}_SUCCESS`,
        payload: {
          data: {
            messages: [
              message1,
              message2
            ]
          }
        }
      };
      const state = contactMessages(initialContactMessages, action);
      expect(state.messages).toEqual({
        1: message1, 2: message2
      });
    });
    it('Should append a message to the messages state when APPEND_TO_CONTACT_MESSAGES is dispatched', () => {
      const message3 = {
        id: 3, message: 'yo'
      };
      const action = {
        type: `${types.APPEND_TO_CONTACT_MESSAGES}`,
        payload: message3
      };
      const state = contactMessages(initialContactMessages, action);
      expect(state.messages[3]).toEqual(message3);
    });
  });
  describe('Testing contacts reducer', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = contactUpdate(initialUpdateContactState);
      expect(state).toEqual(initialUpdateContactState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = contactUpdate();
      expect(state).toEqual(initialUpdateContactState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = contactUpdate(initialUpdateContactState, { type: 'INVALID' });
      expect(state).toEqual(initialUpdateContactState);
    });
    it('should set isLoading to true when UPDATE_CONTACT_LOADING is dispatched', () => {
      const action = { type: `${types.UPDATE_CONTACT}_LOADING`};
      const state = contactUpdate(initialUpdateContactState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when UPDATE_CONTACT_FAILURE is dispatched', () => {
      const action = {
        type: `${types.UPDATE_CONTACT}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = contactUpdate(initialUpdateContactState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('Should set success to true on UPDATE_CONTACT_SUCCESS', () => {
      const action = {
        type: `${types.UPDATE_CONTACT}_SUCCESS`
      };
      const state = contactUpdate(initialUpdateContactState, action);
      expect(state.success).toEqual(true);
    });
    it('Should set success to false on RESET_SUCCESS', () => {
      const action = {
        type: types.RESET_SUCCESS
      };
      const state = contactUpdate(initialUpdateContactState, action);
      expect(state.success).toEqual(false);
    });
  });
});
