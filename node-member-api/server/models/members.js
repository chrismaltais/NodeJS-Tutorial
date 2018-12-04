const mongoose = require('mongoose');
const {MemberSchema} = require('./schemas')

let Member = mongoose.model('Member', MemberSchema);

module.exports = {Member};