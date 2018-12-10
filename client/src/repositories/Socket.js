import io from 'socket.io-client';
import store from '../store';
import types from '../actions/actionTypes';
import axiosInstance from '../services/axiosInstance';

/**
 * Socket
*/
class Socket {
  /**
   * @param {Object} socket
   * @returns {undefined}
   */
  constructor(socket) {
    this.socket = socket;
    this.sendOutReceivedMsgCalled = false;
  }

  /**
   * @param {Function} cb
   * @returns {undefined}
   */
  receiveNewMessage = (cb) => {
    this.socket.on('new message', (data) => {
      cb(data);
    });
  }

  /**
   * @param {Object} state
   * @param {String} token
   * @returns {undefined}
   */
  sendOutReceivedMsg = (state, token) => {
    if (this.sendOutReceivedMsgCalled) return;
    this.sendOutReceivedMsgCalled = true;
    this.receiveNewMessage((newMessage) => {
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
        this
          .emitMessage('active contact', {
            contactId: state.activeContact.activeContact.id,
            token
          }, () => { });
      } else {
        store.dispatch({
          type: types.GET_CONTACTS,
          payload: axiosInstance().get('/users'),
        });
      }
    });
  };

  /**
   * @returns {undefined}
   */
  getSocketId = () => this.socket.id;

  /**
   * @returns {undefined}
   */
  disconnect = () => {
    this.socket.emit('end');
  }

  /**
   * @param {Function} cb
   * @returns {undefined}
   */
  checkConnection = (cb) => {
    this.socket.on('online', (data) => {
      console.log(data);
      store.dispatch({
        type: types.SOCKET_CONNECTED
      });
      cb();
    });
  }

  /**
   * @param {String} hook
   * @param {String} message
   * @param {Function} cb
   * @returns {undefined}
   */
  emitMessage = (hook, message, cb) => {
    this.socket.emit(hook, message);
    cb();
  }
}

let apiUrl = 'https://twilio-gui.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:3002';
}
export default new Socket(io.connect(apiUrl));
