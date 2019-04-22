const secret = require("./secretKey")();
const request = require("request");

const URI = {};

URI.darksky = `https://api.darksky.net/forecast/${
  secret.darksky
}/37.8267, -122.4233?lang=es&units=si`;

request({ url: URI.darksky, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to weather service");
  } else if (res.body.error) {
    console.log("Unable to find location");
  } else {
    const { currently, daily } = res.body;
    console.log(
      `${daily.data[0].summary} Currently is ${
        currently.temperature
      } degrees out. There is a ${currently.precipProbability}% chance of rain`
    );
  }
});

// Geocoding
// Address -> Lat/Long -> Weather

URI.mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${
  secret.mapbox
}&limit=1`;

request({ url: URI.mapbox, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to access location service");
  } else if (res.body.features.length === 0) {
    console.log("Unable to find location. Try another search");
  } else {
    const { features } = res.body;
    const latitude = features[0].center[1];
    const longitude = features[0].center[0];
    console.log(`${latitude}°, ${longitude}°`);
  }
});
