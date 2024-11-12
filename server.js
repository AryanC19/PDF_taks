// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve frontend files from the "public" directory

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for page changes from the admin
    socket.on('pageChange', (pageNumber) => {
        io.emit('pageUpdate', pageNumber); // Broadcast the change to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
