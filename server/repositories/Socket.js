const activeContact = require('./ActiveContact');
const { ReadTime } = require('../database/models');
const tokenService = require('../services/tokenService');
const socketsList = require('./SocketsList');
const clientsList = require('./ClientsList');


function Socket(socket) {
  this.socket = socket;
}

Socket.prototype.emit = function (hook, data) {
  this.socket.emit(hook, data);
};

Socket.prototype.saveActiveContact = function () {
  this.socket.on('active contact', (data) => {
    const { contactId, token } = data;
    const decoded = tokenService.verifyToken(token);
    if (decoded) {
      const { ownerId: id } = decoded;
      activeContact.saveOrUpdate(id, contactId);
      ReadTime.findOrCreate({
        where: { userId: contactId }, defaults: { readTime: new Date() }
      }).then((readTimeResponse) => {
        const isCreated = readTimeResponse[1];
        if (!isCreated) {
          return ReadTime.update({
            readTime: new Date() }, { where: { userId: contactId } });
        }
      }).catch(err => console.log(err));
    }
  });
};

Socket.prototype.onDisconnect = function () {
  this.socket.on('disconnect', () => {
    const socketId = this.socket.id;
    const id = socketsList.get(socketId);
    if (!id) return;
    clientsList.delete(id, socketId);
    socketsList.delete(socketId);
    activeContact.clear();
  });
};

Socket.prototype.disconnectClient = function () {
  this.socket.on('end', () => {
    const socketId = this.socket.id;
    const id = socketsList.get(socketId);
    if (!id) return;
    clientsList.delete(id, socketId);
    socketsList.delete(socketId);
    activeContact.clear();
  });
};

Socket.prototype.saveClientData = function () {
  this.socket.on('socket connect', (data) => {
    const { socketId, token } = data;
    const decoded = tokenService.verifyToken(token);
    if (decoded) {
      const { ownerId: id } = decoded;
      clientsList.save(id, socketId);
      socketsList.save(id, socketId);
    }
  });
};

module.exports = Socket;
