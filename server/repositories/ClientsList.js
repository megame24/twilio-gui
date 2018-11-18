const SocketsList = require('./SocketsList');

function ClientsList() {
  this.clients = {};
}

ClientsList.prototype.save = function (id, socketId) {
  if (!this.clients[id]) this.clients[id] = [];
  this.clients[id].push(socketId);
};

ClientsList.prototype.delete = function (id, socketId) {
  if (Object.keys(SocketsList).length) {
    this.clients[id].splice(this.clients[id].indexOf(socketId), 1);
    if (this.clients[id].length < 1) {
      delete this.clients[id];
    }
  }
};

module.exports = new ClientsList();
