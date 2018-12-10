import { takeEvery } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import socket from '../repositories/Socket';
import store from '../store';

/**
 * @param {Object} action action
 * @returns {null} null
 */
function connectSocketOnLoginSuccess() {
  const state = store.getState();
  if (state.socket.connected) {
    const token = localStorage.getItem('token');
    const socketId = socket.getSocketId();
    socket.emitMessage('socket connect', { socketId, token }, () => {});
    socket.sendOutReceivedMsg(state, token);
  } else {
    socket.checkConnection(() => {
      const token = localStorage.getItem('token');
      const socketId = socket.getSocketId();
      socket.emitMessage('socket connect', { socketId, token }, () => {
      });
      socket.sendOutReceivedMsg(state, token);
    });
  }
}

/**
 * @returns {null} null
 */
export function* watchLoginSuccess() {
  yield takeEvery(`${types.LOGIN}_SUCCESS`, connectSocketOnLoginSuccess);
}

/**
 * @returns {null} null
 */
export function* watchOnPersistLogin() {
  yield takeEvery(types.PERSIST_LOGIN, connectSocketOnLoginSuccess);
}

export default {};
