let socket = io();

socket.on('connect', function () {
    console.log('Connected to server.');
});

// Can't have ES6 arrows functions bc of browser support
socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
    console.log(message);
});