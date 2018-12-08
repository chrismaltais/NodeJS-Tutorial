const path = require('path');
const http = require('http'); // Built in node library
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(clientPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));
  

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

