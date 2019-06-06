const socketIO = require('socket.io');
const Socket = require('../../repositories/Socket');
const tokenService = require('../../services/tokenService');

let socketInstance;
const io = socketIO();
io.on('connection', (socket) => {
  socketInstance = new Socket(socket);
  describe('Testing Socket repository', () => {
    it('Should emit data when emit is called', () => {
      const res = socketInstance.emit('emitted data');
      expect(res).toEqual('emitted data');
    });
    // it('Should return the hook ')
  });
});

