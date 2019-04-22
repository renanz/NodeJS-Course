const https = require("https");
const url =
  "https://api.darksky.net/forecast/ebb863b9dcae16adee0ccebbc207b50a/37.8267,-122.4233";

const request = https.request(url, res => {
  let data = "";
  res.on("data", chunk => {
    data += chunk.toString();
  });
  res.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", err => console.log(err));
request.end();
