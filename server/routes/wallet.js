var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user/:user_id/wallet')
    .post(function(req, res) {


        User.findOne({'id':req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
            Wallet.findById(user.wallet, function(err, wallet) {
                var chain = require('chain-wallets-node');
                var apiClient = wallet.getClient();
                
                
                
                apiClient.issueAsset('AVSEVsuMxtJd4g5AQLxN3fNFgDrLiA2NRy', 
                [{
                    address:'181So6gyYurnM69o5KjMXotZE8CeVK45YV',
                    amount:1
                }]
                , function(stuff) {
                    console.log("transfered "+stuff);
                });
                
            });
        });


    })
    .get(function(req, res) {
        User.findOne({'id':req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Wallet.findById(user.wallet, function(err, wallet) {
                
                
                var chain = require('chain-wallets-node');
                var apiClient = wallet.getClient();
                
                apiClient.getWallet(wallet.id, function(err, chainWallet) {

                    res.json({
                        'id': wallet.id,
                        'publicKey': wallet.publicKey,
                        'balance':  chainWallet.balance,
                        'bucket_count':  chainWallet.bucket_count,
                    });

                });
            });
        });
    });


    router.route('/wallet/:wallet_id')
    .get(function(req, res) {
        Wallet.findOne({'id':req.params.wallet_id}, function(err, wallet) {
            if (err)
                res.send(err);
            res.json({
                'id': wallet.id,
                'publicKey': wallet.publicKey,
            });
        });
    });

};