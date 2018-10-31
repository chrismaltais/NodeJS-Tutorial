const mongoose = require('mongoose');

// Mongoose connects to DB before anything below can happen 
// Blocking Call!
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

module.exports = {mongoose};