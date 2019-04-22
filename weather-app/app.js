const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];
if (address)
  geocode(address, (err, { latitude, longitude, place_name: location }) => {
    if (err) console.log(err);
    else {
      forecast(latitude, longitude, (err, forecastData) => {
        if (err) console.log(err);
        else {
          console.log(location);
          console.log(forecastData);
        }
      });
    }
  });
else console.log("Address not provided");
