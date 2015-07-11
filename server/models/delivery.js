var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeliverySchema   = new Schema({
    from: String,
    to: String,
    description: String,
    privateKey: String,
    asset: String,
    url: String
});

module.exports = mongoose.model('Delivery', DeliverySchema);