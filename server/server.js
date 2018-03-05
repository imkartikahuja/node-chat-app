const path = require('path');     //no need to install build in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  //args are req,res but express and http are integrated so much that we can use app as arg
var io = socketIO(server);  // we get back web socket server
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {                 //connection event listener lets u listen for new connection
  console.log('New user connected');                                                //socket represents to individual sockets as suppose to all the users connected

  // socket.emit('newMessage', {     //passing object in second arg as data
  //   from: 'test',
  //   text: 'Hey. What\'s up!',
  //   createdAt: 65454545
  // });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || ! isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    //socket.leave(params.room)

    users.removeUser(socket.id);    //remove from any other room
    users.addUser(socket.id,params.name,params.room);

    //io.emit -> io.to('Some room name').emit     sends msg to all users in that room
    //socket.broadcast.emit -> socket.broadcast.to('Some room name').emit
    //socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage',(message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      //emits event to every connection
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    }
  });
});

server.listen(port,() => {        //now we are ot using express server we are using http server
  console.log(`Server is up on port ${port}`);
});
