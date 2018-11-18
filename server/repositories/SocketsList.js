function SocketsList() {
  this.sockets = {};
}

SocketsList.prototype.save = function (id, socketId) {
  this.sockets[socketId] = id;
};

SocketsList.prototype.get = function (socketId) {
  return this.sockets[socketId];
};

SocketsList.prototype.delete = function (socketId) {
  delete this.sockets[socketId];
};

module.exports = new SocketsList();
