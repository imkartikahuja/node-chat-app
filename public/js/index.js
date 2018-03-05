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

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Kartik',
//     text: 'Hey. This is Kartik.'
//   }, function (data) {        //acknowledgement to client
//     console.log('Got it', data);
//   });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {              //acknowledgement to client

  });
});
