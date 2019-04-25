const socket = io();
const form = document.querySelector("#messageForm");
const label = document.querySelector("#messageLabel");
const input = document.querySelector("#messageInput");
const sendLocation = document.querySelector("#sendLocation");

form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("sendMessage", e.target.elements.messageInput.value, message => {
    console.log("Delivery", message);
  });
});

socket.on("newMessage", message => {
  label.textContent = message;
  console.log(message);
});

sendLocation.addEventListener("click", e => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported in your browser");
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude });
  });
});
