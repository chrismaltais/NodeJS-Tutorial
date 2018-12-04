const {ObjectId} = require('mongodb'); // MongoDB
const {Member} = require('./../../models/members');
const jwt = require('jsonwebtoken');

const testMemberOne = new ObjectId();
const testMemberTwo = new ObjectId();

let testMembers = [{
    _id: testMemberOne,
    name: 'Jeff Jeffy',
    email: 'jeff.jeffy@queensu.ca',
    password: 'pass123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: testMemberOne, access: 'auth'}, 'abc123').toString()
    }],
    bio: null
}, {
    _id: testMemberTwo,
    name: 'Joe Budden',
    email: 'joe.budden@queensu.ca',
    password: 'pass123',
    bio: null
}];

const populateMembers = async () => {
    await Member.deleteMany({});
    await new Member(testMembers[0]).save();
    await new Member(testMembers[1]).save();
} 

module.exports = {
    testMembers,
    populateMembers
}