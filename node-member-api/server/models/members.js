const mongoose = require('mongoose');
const validator = require('validator');

// Contains no validation
let Member = mongoose.model('Member', {
    name: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 1,
        unique: true ,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 6
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
     }],
    joined: { type: Date, default: Date.now }, 
    bio: { type: String, default: null },
    photo: { type: String },
    tags: { type: Array, default: [] },
    clubs: { type: Array, default: [] },
    projects: { type: Array, default: [] }
});

module.exports = {Member};