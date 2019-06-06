import axiosInstance from '../services/axiosInstance';
import types from './actionTypes';

const getContacts = () => ({
  type: types.GET_CONTACTS,
  payload: axiosInstance().get('/users'),
});

const getContact = id => ({
  type: types.GET_CONTACT,
  payload: axiosInstance().get(`/users/${id}`)
});

const getContactToBeUpdated = id => ({
  type: types.GET_CONTACT_TO_BE_UPDATED,
  payload: axiosInstance().get(`/users/${id}`)
});

const getContactMessages = id => ({
  type: types.GET_CONTACT_MESSAGES,
  payload: axiosInstance().get(`/users/${id}/messages`)
});

const appendToContactMessages = message => ({
  type: types.APPEND_TO_CONTACT_MESSAGES,
  payload: message,
});

const updateContact = (formData, id) => ({
  type: types.UPDATE_CONTACT,
  payload: axiosInstance().put(`/users/${id}`, formData)
});

const clearActiveContact = () => ({
  type: types.CLEAR_ACTIVE_CONTACT,
});

export default {
  getContacts,
  getContact,
  getContactMessages,
  appendToContactMessages,
  updateContact,
  clearActiveContact,
  getContactToBeUpdated
};
