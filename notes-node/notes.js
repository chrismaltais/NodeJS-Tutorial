console.log('Starting notes.js');
const fs = require('fs');

let addNote = (title, body) => {
    let notes = []; // Initialize empty array;
    let note = {
        title,
        body
    };
    
    // Check is notes-data.json exists
    try {
        let notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch(err) {
        console.log("Error! No file to read");
    }
    
    // Create an array of duplicate notes (aka if != 0, there is a duplicate)
    let duplicateNotes = notes.filter((note) => note.title === title);
    console.log(duplicateNotes);
    
    if (duplicateNotes == 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    } else {
        console.log('Error! This is a duplicate note title.')
    }

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
// Check for duplicate notes (ES5)
//    let duplicateNotes = notes.filter((note) => {
//        return note.title === title;
//    });