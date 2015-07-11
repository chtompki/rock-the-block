var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user')
    .post(function(req, res) {
        User.findOne({username:req.body.username, password: req.body.password}, function(err, user) {
            if (err)
                res.send(err);
            if(user) {
                res.json({status:'success'});
            } else {
                res.json({status:'failed'});
            }
        });
        
    })

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