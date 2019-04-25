const socket = io();
const form = document.querySelector("#message-form");
const label = document.querySelector("#message-label");
const input = document.querySelector("#message-input");

form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("sendMessage", input.value);
});

socket.on("newMessage", message => {
  label.textContent = message;
});
