const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New connection");

  // Welcome message
  socket.emit("newMessage", generateMessage("Welcome"));

  // Message to others
  socket.broadcast.emit("newMessage", generateMessage("A new user has joined"));

  // Event on sendMessage
  socket.on("sendMessage", (message, cb) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return cb("Profanity is not allowed");
    }
    io.emit("newMessage", generateMessage(message));
    cb();
  });

  // Event on sendLocation
  socket.on("sendLocation", ({ latitude, longitude }, cb) => {
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    cb();
  });

  // Event on disconnect
  socket.on("disconnect", () => {
    io.emit("newMessage", generateMessage("A user has left"));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
