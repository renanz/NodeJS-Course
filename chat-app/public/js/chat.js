const socket = io();

// Elements
const $form = document.querySelector("#messageForm");
const $input = document.querySelector("#messageInput");
const $label = document.querySelector("#messageLabel");
const $sendLocation = document.querySelector("#sendLocation");
const $messages = document.querySelector("#messages");
const $sidebar = document.querySelector("#sidebar");

// Template
const messageTemplate = document.querySelector("#messageTemplate").innerHTML;
const locationTemplate = document.querySelector("#locationTemplate").innerHTML;
const sideBarTemplate = document.querySelector("#sideBarTemplate").innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const autoScroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

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
socket.on("newMessage", ({ username, text: message, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    username,
    message,
    createdAt: moment(createdAt).format("h:mm a")
  });

  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

// Received a location
socket.on("locationMessage", ({ username, url, createdAt }) => {
  const html = Mustache.render(locationTemplate, {
    username,
    url,
    createdAt: moment(createdAt).format("h:mm a")
  });

  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
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

// Receive users
socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sideBarTemplate, {
    room,
    users
  });

  document.querySelector("#sidebar").innerHTML = html;
});
