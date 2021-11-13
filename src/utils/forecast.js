const request = require("request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=42ab693a8edc3e4543a9f6e04b29daf4&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        forecast:
          body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. There is a " +
          body.current.precip +
          "% chance of rain.",
        location: body.request.query,
      });
    }
  });
};

module.exports = forecast;
