const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
};

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json')

let note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);

// JSON Object to String ///////////////////////
//let obj= {
//    name: 'Chris'
//};
//
//let stringObj = JSON.stringify(obj);
//console.log(typeof stringObj);
//console.log(stringObj);

// String to JSON Object ///////////////////////////
//let personString = '{"name": "Chris", "age": 21}';
//let person = JSON.parse(personString);
//
//console.log(typeof person);
//console.log(person);