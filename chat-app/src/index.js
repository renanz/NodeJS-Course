const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage
} = require("./utils/messages");
const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New connection");

  // Event on join
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser(
      { id: socket.id, username, room },
      callback
    );

    if (error) return callback(error);

    socket.join(room);

    socket.emit("newMessage", generateMessage("Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("newMessage", generateMessage(`${user.username} has joined!`));

    callback();
  });

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
    const user = removeUser(socket.id);

    if (user)
      io.to(user.room).emit(
        "newMessage",
        generateMessage(`${user.username} has left`)
      );
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
