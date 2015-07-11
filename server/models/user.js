var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    id: String,
    username: String,
    password: String,
    bucket: String
});

module.exports = mongoose.model('User', UserSchema);