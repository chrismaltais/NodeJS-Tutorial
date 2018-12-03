const {SHA256} = require('crypto-js');

let message = 'I am a message';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hashed value: ${hash}`);

let data = {
    id: 4
}

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesalt').toString()
}

// MITM example:
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

let resultHash = SHA256(JSON.stringify(token.data) + 'somesalt').toString();

if (resultHash === token.hash) {
    console.log('Results are the same.');
} else {
    console.log('Results are not the same. Do not trust.');
}