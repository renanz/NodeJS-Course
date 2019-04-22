const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("Hello express");
});

app.get("/help", (req, res) => {
  res.send("Help");
});

app.get("/about", (req, res) => {
  res.send("<h1>About<h1>");
});

app.get("/weather", (req, res) => {
  res.send({ location: "Some Place", forecast: 22 });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
