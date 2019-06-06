module.exports = () => ({
  on: (string, cb) => {
    const socket = {
      emit: hook => hook,
      on: hook => hook
    };
    cb(socket);
  }
});
