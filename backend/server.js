const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

app.use(cors());


io.on("connect", (socket) => {
    console.log(`User with id ${socket.id} connected`);
});





server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
