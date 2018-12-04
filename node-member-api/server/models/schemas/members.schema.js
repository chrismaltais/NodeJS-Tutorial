const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const MemberSchema = new mongoose.Schema({
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
})

// Generates what gets sent back when a mongoose model is converted into JSON value
MemberSchema.methods.toJSON = function () {
    let member = this;
    let memberObject = member.toObject();
    return _.pick(memberObject, ['_id', 'name', 'email']);
}

// Generates tokens and populates tokens field of schema
MemberSchema.methods.generateAuthToken = function () {
    var member = this;
    var access = 'auth';
    var token = jwt.sign({_id: member._id.toHexString(), access}, 'abc123').toString();
  
    member.tokens.push({access, token});
  
    return member.save().then(() => {
      return token;
    });
};

module.exports = MemberSchema;