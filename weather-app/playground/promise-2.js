const request = require('request');
const api_key = 'AIzaSyA1cq3uWvb8guxei5qIJjZaLp1diIXK834';

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedString= encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}&key=${api_key}`,
            json: true // return as a JSON instead of JSON string
        }, (error, response, body) => {
            if (error) { 
                reject('Unable to connect to Google servers');
            } else if (body.status === "ZERO_RESULTS") {
                reject("Unable to find that address.");
            } else if (body.status === 'OK') {
                resolve({
                    address:  body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        });
    });
}

geocodeAddress('Ottawa').then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (errorMessage) => {
    console.log(errorMessage);
});