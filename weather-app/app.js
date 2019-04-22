const secret = require("./secretKey")();
const request = require("request");

const URI = `https://api.darksky.net/forecast/${secret}/37.8267,-122.4233`;

request({ url: URI }, (err, res) => {
  const data = JSON.parse(res.body);
  console.log(data.currently);
});
