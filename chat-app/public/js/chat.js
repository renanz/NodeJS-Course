const socket = io();

// Elements
const $form = document.querySelector("#messageForm");
const $input = document.querySelector("#messageInput");
const $label = document.querySelector("#messageLabel");
const $sendLocation = document.querySelector("#sendLocation");
const $messages = document.querySelector("#messages");

// Template
const messageTemplate = document.querySelector("#messageTemplate").innerHTML;
const locationTemplate = document.querySelector("#locationTemplate").innerHTML;

$form.addEventListener("submit", e => {
  e.preventDefault();

  // Disable
  $form.querySelector("button").setAttribute("disabled", "disabled");

  socket.emit("sendMessage", e.target.elements.messageInput.value, err => {
    $form.querySelector("button").removeAttribute("disabled");
    $input.value = "";
    $input.focus();

    if (err) return console.log("Error", err);
    console.log("Delivered");
  });
});

// Received a message
socket.on("newMessage", message => {
  const html = Mustache.render(messageTemplate, { message });

  $messages.insertAdjacentHTML("beforeend", html);
});

// Received a location
socket.on("locationMessage", location => {
  const html = Mustache.render(locationTemplate, { url: location });

  $messages.insertAdjacentHTML("beforeend", html);
});

$sendLocation.addEventListener("click", e => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported in your browser");

  $sendLocation.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    socket.emit("sendLocation", { latitude, longitude }, err => {
      if (err) return console.log("Err", err);
      console.log("Location sent");
    });

    $sendLocation.removeAttribute("disabled");
  });
});
