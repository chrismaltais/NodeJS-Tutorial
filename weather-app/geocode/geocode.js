let request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedString= encodeURIComponent(address);
    // Options object and callback function
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}&key=AIzaSyA1cq3uWvb8guxei5qIJjZaLp1diIXK834`,
        json: true // return as a JSON instead of JSON string
    }, (error, response, body) => {
        if (error) { 
            callback('Unable to connect to Google servers');
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find that address.");
        } else if (body.status === 'OK') {
            callback(undefined, {
                address:  body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
}

module.exports = {
    geocodeAddress
}