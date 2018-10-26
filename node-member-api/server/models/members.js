let mongoose = require('mongoose');

// Contains no validation
let Member = mongoose.model('Member', {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    joined: { type: Date, default: Date.now }, 
    bio: { type: String, default: null },
    photo: { type: String },
    tags: { type: Array, default: [] },
    clubs: { type: Array, default: [] },
    projects: { type: Array, default: [] }
});

module.exports = {Member};