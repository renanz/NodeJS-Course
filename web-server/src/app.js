const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/weather", (req, res) => {
  res.send({ location: "Some Place", forecast: 22 });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
