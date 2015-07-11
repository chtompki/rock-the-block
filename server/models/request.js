var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RequestSchema   = new Schema({
    from: String,
    to: String,
    description: String,
    publicKey: String,
    privateKey: String,
    asset: String
});

module.exports = mongoose.model('Request', RequestSchema);