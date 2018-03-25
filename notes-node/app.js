console.log('Starting app.');

const fs = require('fs'); // fetch fs module
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js') // Pass in a relative path
// let user = os.userInfo();

const argv = yargs.argv
let command = argv._[0]; // Grabs first element  of yargs (in this case add, list, etc)
console.log('Command:',command);
console.log('Yargs', argv);


if (command === 'add') {
    notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else if (command === 'read') {
    notes.readNote(argv.title);
} else {
    console.log('Command not recognized!');
}









// EXTRA LEARNING STUFF ////////////////////////////////////////////////////////////////////////////
// console.log(_.isString(true));
// console.log(_.isString('Chris'));
// Ways to display results:
// console.log(`Result: ${notes.add(9, -2)}`);
// console.log('Result: ', notes.add(-9, 2));
// Asynchronously and with string concatenation
/* fs.appendFile('greetings.txt', 'Hello ' + user.username + '!', function(err) {
    if (err) {
        console.log('Unable to write to file');
    }
}); */

// Asynchronously and with Template Strings
//fs.appendFile('greetings.txt', ` Hello ${user.username}! You are ${notes.age}.`, function(err) {
//    if (err) {
//        console.log('Unable to write to file');
//    }
//});

// Synchronously
//fs.appendFileSync('greetings.txt', 'Hello World!');