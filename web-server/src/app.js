const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Renan Zelaya" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", message: "Some help message" });
});

app.get("/weather", (req, res) => {
  res.send({ location: "Some Place", forecast: 22 });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
