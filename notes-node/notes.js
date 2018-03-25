console.log('Starting notes.js');
const fs = require('fs');

let addNote = (title, body) => {
    let notes = []; // Initialize empty array;
    let note = {
        title,
        body
    };
    notes.push(note);
    fs.writeFileSync('notes-data.json', notes);
};

let getAll = () => {
    console.log('Getting all notes');
}

let removeNote = (title) => {
    console.log(`Removing note you specified as "${title}"`);
};

let readNote = (title) => {
    console.log(`Reading file '${title}'...`)
};

module.exports = {
    addNote, // or addNote: addNote; (ES5)
    getAll,
    removeNote,
    readNote
};
// LEARNING STUFF //////////////////////////
// ES5
// module.exports.addNote = function() {
// }
// ES6
//module.exports.add = (num1, num2) => {
//    return num1 + num2;
//};