const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
info = [];
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the App !!");
});

server.listen(4500, () => {
  console.log("Server is working at port 4500");
});

io.on("connection", (socket) => {
  socket.on("joined" , (user) => {
        socket.emit('welcome', {user: "Admin", message: `Welcome ${user} to the group`});
        socket.broadcast.emit('userJoined', {user: "Admin", message: `${user} has joined`});
        info.socketId = user;
  });

  socket.on('disconnect', (data) => {
    socket.broadcast.emit('leave', {user: 'Admin', message: `${info.socketId} has left`});
  });

  socket.on('message', (data) => {
    io.emit('sendMessage', {user: data.user, message: data.message, socketId: socket.id });   
  });
});


