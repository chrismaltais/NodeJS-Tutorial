const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Member} = require('./../server/models/members');

// Member.deleteMany({}).then((result) => {
//     let {n: numberRecordsDeleted} = result;
//     console.log(`Deleted ${numberRecordsDeleted} records!`);
// });

// Member.findOneAndRemove({_id: '5bd5cf3fecf49981a8ac959b'}).then((member) => {
//     console.log(member);
// });

Member.findByIdAndRemove('5bd5cf3fecf49981a8ac959b').then((member) => {
    console.log(member);
});


