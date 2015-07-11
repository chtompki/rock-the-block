var User = require('./../models/user');
var Address = require('./../models/address');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user/:user_id/request')
    
    .post(function(req, res) {
        
        var bank = req.body.bank;;
        var requestors = req.body.requestors;
        var description = req.body.description;
        
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            
            var client = Wallet.findOne().getClient()

            client.createAsset(wallet.id, false, '', {requestors: requestors, description: description}, function(err, response){
                console.log(response);
            })

        });
    })
};