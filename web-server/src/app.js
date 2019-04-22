const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Renan Zelaya" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Renan Zelaya" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Renan Zelaya",
    message: "Some help message"
  });
});

app.get("/weather", (req, res) => {
  res.send({ location: "Some Place", forecast: 22 });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
