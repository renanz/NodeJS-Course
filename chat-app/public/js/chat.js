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

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

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
socket.on("newMessage", ({ text: message, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    message,
    createdAt: moment(createdAt).format("h:mm a")
  });

  $messages.insertAdjacentHTML("beforeend", html);
});

// Received a location
socket.on("locationMessage", ({ url, createdAt }) => {
  const html = Mustache.render(locationTemplate, {
    url,
    createdAt: moment(createdAt).format("h:mm a")
  });

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

// Emit join message
socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
