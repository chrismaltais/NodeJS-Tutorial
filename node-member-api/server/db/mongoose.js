const mongoose = require('mongoose');

// Mongoose connects to DB before anything below can happen 
// Blocking Call!
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProfileProjectTest', { useNewUrlParser: true });

module.exports = {mongoose};