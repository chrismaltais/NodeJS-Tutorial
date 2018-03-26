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
    let note = notes.addNote(argv.title, argv.body);
    console.log(note);
    if (note) {
        console.log('Successfully added note!');
        notes.logNote(note);
    } else {
        console.log('Duplicate note title!');
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Error, note not found';
    console.log(message);
} else if (command === 'read') {
    let note = notes.readNote(argv.title);
    if (note) {
        console.log('Found note!');
        notes.logNote(note);
    } else {
        console.log('Note cannot be read!');
    }
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