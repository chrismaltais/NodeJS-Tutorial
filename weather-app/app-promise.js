require('dotenv').config();
const yargs = require('yargs');
const axios = require('axios');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedString = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}&key=${process.env.googleAPIKey}`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error("Could not find address!")
    }
    
    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;
    let weatherURL = `https://api.darksky.net/forecast/${process.env.darkskyAPIKey}/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address); 
    return axios.get(weatherURL);
}).then((response) => {
    let temperature = weather.convertToCelsius(response.data.currently.temperature);
    let apparentTemperature = weather.convertToCelsius(response.data.currently.apparentTemperature);
    console.log(`It's currently ${temperature} degs Celsius, but feels like ${apparentTemperature} Celsius.`)
}).catch( (errorMessage) => {
    if (errorMessage.code === "ENOTFOUND") {
        console.log("Could not connect to Google Servers");
    } else {
        console.log(errorMessage.message);
    }
});