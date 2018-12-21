const SocketsList = require('./SocketsList');

/**
 * ClientsList constructor
 * @returns {undefined}
 */
function ClientsList() {
  this.clients = {};
}

/**
 * Map the list of connected socket clients to the respective logged in user
 * @param {Number} id id of the currently logged in user
 * @param {Number} socketId socket id from the client/front-end
 * @returns {undefined}
 */
ClientsList.prototype.save = function (id, socketId) {
  if (!this.clients[id]) this.clients[id] = [];
  this.clients[id].push(socketId);
};

/**
 * Delete a socket id from the list of mapped socket ids to user id
 * @param {Number} id id of the currently logged in user
 * @param {Number} socketId socket id from the client/front-end
 * @returns {undefined}
 */
ClientsList.prototype.delete = function (id, socketId) {
  if (Object.keys(SocketsList).length) {
    this.clients[id].splice(this.clients[id].indexOf(socketId), 1);
    if (this.clients[id].length < 1) {
      delete this.clients[id];
    }
  }
};

module.exports = new ClientsList();
