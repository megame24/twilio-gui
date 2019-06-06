import axiosInstance from '../services/axiosInstance';
import types from './actionTypes';

const messageNewContact = formData => ({
  type: types.NEW_CONTACT_MSG,
  payload: axiosInstance().post('/messages/new', formData),
});

const messageOldContact = formData => ({
  type: types.OLD_CONTACT_MSG,
  payload: axiosInstance().post('/messages', formData),
});

export default {
  messageNewContact,
  messageOldContact
};
