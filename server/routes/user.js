var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user')
/*    
    .post(function(req, res) {
        
        var user = new User();
        user.name = req.body.name;
        user.id = 'yxh340'
        
        var address = new Address();
        var key = bitcoin.ECKey.makeRandom();
        address.publicKey = key.pub.getAddress().toString();
        address.privateKey = key.toWIF();
        
        user.address = address;

        // save the bear and check for errors
        address.save(function(err) {
            if (err)
                res.send(err);
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });
    })
*/
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

    router.route('/user/:user_id')
    .get(function(req, res) {
        User.findOne({'id':req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Wallet.findById(user.wallet, function(err, wallet) {
                res.json({
                    'id': user.id,
                    'name': user.name,
                    'wallet': wallet.id
                });
            });
        });
    });

};