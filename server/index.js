const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const socketIO = require('socket.io');
const http = require('http');
const routes = require('./routes');
const Socket = require('./repositories/Socket');

const app = express();
const server = http.Server(app);

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(path.join(__dirname, '../client/dist')));

require('dotenv').config();
const port = process.env.PORT || 3002;

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => { // eslint-disable-line
    // do not log errors on test environment,
    // returning it is good enough
    if (process.env.NODE_ENV !== 'test') console.log(err.stack);
    return res.status(err.status || 500)
      .json({
        errors: {
          message: err.message,
          error: err,
        },
      });
  });
}

// production error handler
// no stacktraces leaked to user

app.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


// store the socket server in a global variable to enable
// use in different modules
global.io = socketIO(server);

global.io.on('connection', (socket) => {
  const socketInstance = new Socket(socket);
  socketInstance.emit('online', { online: true });
  socketInstance.disconnectClient();
  socketInstance.saveClientData();
  socketInstance.saveActiveContact();
  socketInstance.onDisconnect();
});
