import io from 'socket.io-client';
import store from '../store';
import types from '../actions/actionTypes';

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
  }

  /**
   * @param {Function} cb
   * @returns {undefined}
   */
  receiveNewMessage = (cb) => {
    this.socket.on('new message', (data) => {
      console.log(data);
      cb(data);
    });
  }

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
