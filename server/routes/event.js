var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/event')
    .get(function(req, res) {
        console.out(req);
    })
    .post(function(req, res) {
        console.out(req);
    });

};