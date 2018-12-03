const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

let token = jwt.sign(data, '123abc');
console.log(`Token is: ${token}`);

let decoded = jwt.verify(token, '123abc');
console.log('Decoded token is:', decoded);
