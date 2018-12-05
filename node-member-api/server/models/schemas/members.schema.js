const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const MemberSchema = new mongoose.Schema({
    name: { type: String, trim: true },
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
// Instance method
MemberSchema.methods.toJSON = function () {
    let member = this;
    let memberObject = member.toObject();
    return _.pick(memberObject, ['_id', 'name', 'email', 'bio']);
}

// Generates tokens and populates tokens field of schema
// Instance method
MemberSchema.methods.generateAuthToken = function () {
    var member = this;
    var access = 'auth';
    var token = jwt.sign({_id: member._id.toHexString(), access}, 'abc123').toString();
  
    member.tokens.push({access, token});
  
    return member.save().then(() => {
      return token;
    });
};

// Deletes a member's token
// $pull lets you remove an item from an array tht match certain criteria
// Instance method
MemberSchema.methods.deleteToken = async function (token) {
    member = this;
    return await member.update({
        $pull: {
            tokens: {token}
        }
    })

}

// Finds a user by Token
// Model method
MemberSchema.statics.findByToken = function (token) {
    let Member = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return null;
    }

    return Member.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

// Find a user by credentials (i.e. login)
// Model method
MemberSchema.statics.findByCredentials = async function (email, password) {
    let Member = this;
    let foundMember = await Member.findOne({email});

    if (!foundMember) {
        return null;
    }

    let isValidUser = await bcrypt.compare(password, foundMember.password);

    if (isValidUser) {
        return foundMember;
    } else {
        return null;
    }
}

// Hashes the password if the password was modified
// Instance method
MemberSchema.pre('save', async function (next) {
    let member = this;

    if (member.isModified('password')) {
        let salt = await bcrypt.genSalt(10);
        member.password = await bcrypt.hash(member.password, salt);
        next();
    } else {
        next();
    }
})

module.exports = MemberSchema;