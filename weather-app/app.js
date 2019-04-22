const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];
if (address)
  geocode(address, (err, data) => {
    if (err) console.log(err);
    else {
      forecast(data.latitude, data.longitude, (err, forecastData) => {
        if (err) console.log(err);
        else {
          console.log(data.place_name);
          console.log(forecastData);
        }
      });
    }
  });
else console.log("Address not provided");
