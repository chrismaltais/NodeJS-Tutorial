const request = require('request');
// Options object and callback function
request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=6139%20Westwater%20Crescent',
    json: true // return as a JSON instead of JSON string
}, (error, response, body) => {
    console.log(body);
});