# Things I Learned
**How the Call Stack, Node API’s and Callback Queue Interact:**

![](https://d2mxuefqeaa7sj.cloudfront.net/s_1C518EE6BA31D580E00A0AEA27C9EE5C6D3A192219E23A8F81FF47DE03B54C6A_1523383780362_Screen+Shot+2018-04-10+at+2.08.38+PM.png)


**Debugging in Chrome Developer Tools:**
```javascript
node --inspect-brk app.js
```
In Chrome: Go to **chrome://inspect**
Keyboard Shortcuts:

1. cmd + \ → Run debugger line
2. ctrl + L → Clear the console

**Encoding/Decoding URI’s:**
```javascript
let encodedString = encodeURIComponent('613 Jacobsen Road');
// encodedString = 613%Jacobsen%Road
let decodedString = decodeURIComponent(encodedString);
// decodedString = 613 Jacobsen Road
```

**Template for Requests:**
Error → Status Code
Response → Headers, Request info
Body → Body

```javascript
const request = require('request');
request({
    url: // Insert URL
    json: true // Returns as JSON instead of JSON String
}, (error, response, body) => {
    if (error) {
        console.log("Unable to connect to requesting server");
    } else if (!error && response.statusCode === 200) {
        console.log(`Info wanted: ${body.location.in.json}`);
    } else {
        console.log("Invalid request parameters");
    }
});
```

**Template for Returning Variables from Request Asynchronously via Callbacks**

```javascript
const request = require('request');
let getWeather = (var1, var2, callback) => {
    request({
        url: // Insert URL
        json: true // Returns as JSON instead of JSON String
    }, (error, response, body) => {
        if (error) {
          callback("Unable to connect to requesting server");
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
            variableFromJSON1: body.location.in.JSON;
            variableFromJSON2: body.location.in.JSON2;    
        } else {
            callback("Invalid request parameters");
        }
      });
    }
module.exports = {
    getWeather
}
```

**Calling Modules within app.js**
Passing in variables and a callback function for asynchronous results

```javascript
const weather = require('./folder/file');
weather.moduleName(variable1, variable2, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage); 
    } else {
        console.log(JSON.stringify(weatherResults, undefined, 2)); // Prettify the results
    }
});
```
**Format Numbers to Specific Decimal Places:**
```javascript
number.toFixed(2);
```

