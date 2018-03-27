const fs = require('fs');

// Write Note
let saveNotes = (notes) => {
    try {
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    } catch (err) {
        console.log("Cannot write file.");
    }
};

// Read Notes
let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    }
};

// Add Note
let addNote = (title, body) => {
    var notes = fetchNotes(); // Grab existing data
    let note = {
        title,
        body
    };
    
    // Create an array of duplicate notes (aka if != 0, there is a duplicate)
    let duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

// List Notes
let getAll = () => {
    return fetchNotes();
}

// Remove specific Note
let removeNote = (title) => {
    let notes = fetchNotes();
    // Fill array filteredNote with all elements that pass the test of note.title !== title;
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
};

// Read Specific Note
let readNote = (title) => {
    let notes = fetchNotes();
    let noteRead = notes.filter((note) => note.title === title);
    return noteRead[0];
};

// Log the note
let logNote = (note) => {
    debugger;
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote, // or addNote: addNote; (ES5)
    getAll,
    removeNote,
    readNote,
    logNote
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