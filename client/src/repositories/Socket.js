import io from 'socket.io-client';
import store from '../store';
import types from '../actions/actionTypes';
import axiosInstance from '../services/axiosInstance';

/**
 * Socket class
*/
class Socket {
  /**
   * Constructor function
   * @param {Object} socket
   * @returns {undefined}
   */
  constructor(socket) {
    this.socket = socket;
    this.sendOutReceivedMsgCalled = false;
  }

  /**
   * Handle received messages(data)
   * @param {Function} cb
   * @returns {undefined}
   */
  receiveNewMessage = (cb) => {
    this.socket.on('new message', (data) => {
      cb(data);
    });
  }

  /**
   * Send out received message
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
   * Get socket id
   * @returns {undefined}
   */
  getSocketId = () => this.socket.id;

  /**
   * Simulate disconnection
   * @returns {undefined}
   */
  disconnect = () => {
    this.socket.emit('end');
  }

  /**
   * Check for connection
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
   * Emit a message
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
