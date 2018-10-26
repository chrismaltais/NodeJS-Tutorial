let {ObjectId} = require('mongodb');

let {mongoose} = require('./../server/db/mongoose');
let {Member} = require('./../server/models/members');

let id = '5bd224966f2ba4b112dd1dc9';
// Object ID validation
if (!ObjectId.isValid(id)) {
    return console.log(`${id} is not a proper ID!`);
}
// Member.find({
//     _id: id // Mongoose typecasts to ObjectID object!
// }).then((members) => {
//     console.log(members)
//     console.log(`Found via find!`);
// });

// Member.findOne({
//     _id: id // Mongoose typecasts to ObjectID object!
// }).then((member) => {
//     if (!member) {
//         return console.log(`Could not find Member: ${id}`);
//     }
//     console.log(member)
//     let {name} = member;
//     console.log(`Found ${name} via findOne!`);
// });

Member.findById(id).then((member) => {
    if (!member) {
        return console.log(`Could not find Member: ${id}`);
    }
    console.log(JSON.stringify(member, undefined, 4));
    let {name} = member;
    console.log(`Found ${name} via ID!`);
}).catch((err) => console.log(err));
