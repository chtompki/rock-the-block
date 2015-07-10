var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user/:user_id/wallet')
    .get(function(req, res) {
        User.findOne({'id':req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Wallet.findById(user.wallet, function(err, wallet) {
                
                
                var chain = require('chain-wallets-node');
                var c = new chain.Client({
                  apiTokenId: '5e10baae31590dc4c80baa4a7ce4df56',
                  secretApiToken: 'c195d7731cf8966556613f4294229965'
                });
                c.keyStore.add(new chain.Xprv(wallet.privateKey, true));
                c.getWallet(wallet.id, function(err, chainWallet) {

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