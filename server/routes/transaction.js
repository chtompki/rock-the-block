var User = require('./../models/user');
var Address = require('./../models/address');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user/:user_id/transaction')
    
    .post(function(req, res) {
        
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
                                
                var transaction = new bitcoin.Transaction()

                var previousTrasactionHash = req.body.transaction;
                var destinationAddress = req.body.to;
                var satohisAmount = req.body.amount;

                // Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
                transaction.addInput(previousTrasactionHash, 0)
                
                // Add the output (who to pay to) of the form [payee's address, amount in satoshis]
                transaction.addOutput(destinationAddress, satohisAmount)
                
                Address.findById(user.address, function(err, address) {
                    if (err)
                        res.send(err);

                    // Initialize a private key using WIF
                    var key = bitcoin.ECKey.fromWIF(address.privateKey);
                    
                    // Sign the first input with the new key
                    transaction.sign(0, key);
                    
                    // Print transaction serialized as hex
                    res.json({'transaction': transaction.toHex()});
                });
        });
    })
};