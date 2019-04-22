const secret = require("./secretKey")();
const request = require("request");

const URI = {};

const geocode = (address, callback) => {
  URI.mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${secret.mapbox}&limit=1`;

  request({ url: URI.mapbox, json: true }, (err, res) => {
    if (err) callback("Unable to connect to location services!", undefined);
    else if (res.body.features.length === 0)
      callback("Unable to find location. Try another search", undefined);
    else {
      const { features } = res.body;
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[1],
        place_name: features[0].place_name
      });
    }
  });
};

geocode("Philadelphia", (err, data) => {
  console.log(data);
});

geocode("New York", (err, data) => {
  console.log(data);
});
