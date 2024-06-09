const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connect", (socket) => {
  console.log(`you are now connected with id ${socket.id}`);

  socket.on("messagesent", (message) => {
    console.log(message);

    socket.broadcast.emit("receivedMessage", message);
  });
});





server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
