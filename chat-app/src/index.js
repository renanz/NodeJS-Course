const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New connection");

  socket.emit("newMessage", "Welcome");
  socket.broadcast.emit("newMessage", "A new user has joined");

  socket.on("sendMessage", (message, cb) => {
    io.emit("newMessage", message);
    cb("Delivered");
  });

  socket.on("sendLocation", ({ latitude, longitude }) => {
    io.emit("newMessage", `https://google.com/maps?q=${latitude},${longitude}`);
  });

  socket.on("disconnect", () => {
    io.emit("newMessage", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
