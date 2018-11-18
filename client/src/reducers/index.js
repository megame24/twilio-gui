import { combineReducers } from 'redux';
import {
  contacts, activeContact, contactMessages, contactUpdate
} from './contactReducer';
import sentMessage from './sentMessageReducer';
import auth from './authReducer';
import number from './numberReducer';
import socket from './socketReducer';

export default combineReducers({
  contacts,
  sentMessage,
  activeContact,
  contactMessages,
  contactUpdate,
  auth,
  number,
  socket,
});
