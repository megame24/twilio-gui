import { takeEvery } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import socket from '../repositories/Socket';
import axiosInstance from '../services/axiosInstance';
import store from '../store';

/**
 * @param {Object} action action
 * @returns {null} null
 */
function saveProfileOnLoginSuccess() {
  let state = store.getState();
  if (state.socket.connected) {
    const token = localStorage.getItem('token');
    // socket.connect();
    const socketId = socket.getSocketId();
    socket.emitMessage('socket connect', { socketId, token }, () => {});
    // make sure this is called once
    socket.receiveNewMessage((newMessage) => {
      state = store.getState();
      if (state.activeContact.activeContact.id === newMessage.fromId) {
        newMessage.to = {
          id: newMessage.toId
        };
        newMessage.from = {
          id: newMessage.fromId
        };
        store.dispatch({
          type: types.APPEND_TO_CONTACT_MESSAGES,
          payload: newMessage,
        });
        socket
          .emitMessage('active contact', {
            contactId: state.activeContact.activeContact.id,
            token
          }, () => {});
      } else {
        store.dispatch({
          type: types.GET_CONTACTS,
          payload: axiosInstance().get('/users'),
        });
      }
    });
  } else {
    socket.checkConnection(() => {
      const token = localStorage.getItem('token');
      const socketId = socket.getSocketId();
      socket.emitMessage('socket connect', { socketId, token }, () => {
      });
      socket.receiveNewMessage((newMessage) => {
        state = store.getState();
        if (state.activeContact.activeContact.id === newMessage.fromId) {
          newMessage.to = {
            id: newMessage.toId
          };
          newMessage.from = {
            id: newMessage.fromId
          };
          store.dispatch({
            type: types.APPEND_TO_CONTACT_MESSAGES,
            payload: newMessage,
          });
          socket
            .emitMessage('active contact', {
              contactId: state.activeContact.activeContact.id,
              token
            }, () => {});
        } else {
          store.dispatch({
            type: types.GET_CONTACTS,
            payload: axiosInstance().get('/users'),
          });
        }
      });
    });
  }
}

/**
 * @returns {null} null
 */
export function* watchLoginSuccess() {
  yield takeEvery(`${types.LOGIN}_SUCCESS`, saveProfileOnLoginSuccess);
}

/**
 * @returns {null} null
 */
export function* watchOnPersistLogin() {
  yield takeEvery(types.PERSIST_LOGIN, saveProfileOnLoginSuccess);
}

export default {};
