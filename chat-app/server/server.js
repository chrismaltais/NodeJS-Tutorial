const path = require('path');
const http = require('http'); // Built in node library
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(clientPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat!',
        createAt: Date.now()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined.',
        createdAt: Date.now()
    })

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

