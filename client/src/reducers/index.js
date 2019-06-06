import { combineReducers } from 'redux';
import {
  contacts, activeContact, contactMessages, contactUpdate
} from './contactReducer';
import sentMessage from './sentMessageReducer';
import auth from './authReducer';
import phoneNumber from './phoneNumberReducer';
import socket from './socketReducer';

export default combineReducers({
  contacts,
  sentMessage,
  activeContact,
  contactMessages,
  contactUpdate,
  auth,
  phoneNumber,
  socket,
});
