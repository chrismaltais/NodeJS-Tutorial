const mongoose = require('mongoose');

// Mongoose connects to DB before anything below can happen 
// Blocking Call!
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProfileProjectTest', { useNewUrlParser: true });

// Contains no validation
let Member = mongoose.model('Member', {
    name: { type: String, required: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    joined: { type: Date, default: Date.now }, 
    bio: { type: String, default: null },
    photo: { type: String },
    tags: { type: Array, default: [] },
    clubs: { type: Array, default: [] },
    projects: { type: Array, default: [] }
});

// Beware of typecasting!
let newMember = new Member({
    name: 'Jacob Jacobsen',
    email: 'jacobb.jacobsen@queensu.ca',
    password: 'pass123'
});

newMember.save().then((doc) => {
    let {name} = newMember;
    console.log(`Saved new member: ${name}`);
}, (err) => {
    console.log('Unable to save user.')
})