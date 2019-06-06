/**
 * SocketList constructor
 * @returns {undefined}
 */
function SocketsList() {
  this.sockets = {};
}

/**
 * Map the socket details of a connect
 * client/front-end to the logged in user
 * @param {Number} id id of the currently logged in user
 * @param {Number} socketId socket id from the client/front-end
 * @returns {undefined}
 */
SocketsList.prototype.save = function (id, socketId) {
  this.sockets[socketId] = id;
};

/**
 * Get the user id mapped to a socketId
 * @param {Number} socketId socket id from the client/front-end
 * @returns {Number} user id
 */
SocketsList.prototype.get = function (socketId) {
  return this.sockets[socketId];
};

/**
 * Delete the user id mapped to a socketId
 * @param {Number} socketId socket id from the client/front-end
 * @returns {undefined}
 */
SocketsList.prototype.delete = function (socketId) {
  delete this.sockets[socketId];
};

module.exports = new SocketsList();
