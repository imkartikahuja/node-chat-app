var socket = io();    //iniate a request from client to server to open a web socket and keep that connection open

socket.on('connect', function () {
  console.log('Connected to server');

//   socket.emit('createMessage', {
//     from: 'Kartik',
//     text: 'Hey. This is Kartik.'
//   });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
