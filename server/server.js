const path = require('path');     //no need to install build in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  //args are req,res but express and http are integrated so much that we can use app as arg
var io = socketIO(server);  // we get back web socket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {                 //connection event listener lets u listen for new connection
  console.log('New user connected');                                                //socket represents to individual sockets as suppose to all the users connected

  socket.emit('newMessage', {     //passing object in second arg as data
    from: 'test',
    text: 'Hey. What\'s up!',
    createdAt: 65454545
  });

  socket.on('createMessage',(message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});

server.listen(port,() => {        //now we are ot using express server we are using http server
  console.log(`Server is up on port ${port}`);
});
