let mongoose = require('mongoose');

let Project = mongoose.model('Projects', {
    name: {type: String, required: true, minLength: 1},
    status: {type: String, default: 'New'},
    type: {type: String},
    club: {type: String, required: true},
    start: {type: Date},
    end: {type: Date},
    contributors: {type: Array, default: []},
    tags: {type: Array, default: []}
});

module.exports = {Project};