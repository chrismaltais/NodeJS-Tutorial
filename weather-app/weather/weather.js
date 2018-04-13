const request = require('request');
const darkskyAPIKey = '36a2a9e3dd3c9efd0f19f758cf5656c6';

let convertToCelsius = (temp) => ((temp - 32) * 0.5556).toFixed(1);

let getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${darkskyAPIKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Error connecting to Darksky Servers");
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: convertToCelsius(body.currently.temperature),
                summary: body.currently.summary,
                apparentTemperature: convertToCelsius(body.currently.apparentTemperature),
            });
        } else {
            callback("Unable to find weather for that address.");
        }  
    });
}

debugger;

module.exports = {
    getWeather,
    convertToCelsius
}

