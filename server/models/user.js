var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    id: String,
    name: String,
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'}
});

module.exports = mongoose.model('User', UserSchema);