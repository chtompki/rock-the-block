var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var Request = require('./../models/request');
var Delivery = require('./../models/delivery');
var bitcoin = require('bitcoinjs-lib');
var ursa = require('ursa');

module.exports = function(router) {

    router.route('/user/:user_id/delivery')
    
    // return a list of all the user's requests
    .get(function(req, res) {
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Delivery.find(function(err, deliveries) {

                Wallet.findOne(function(err, wallet) {
    
                    var client = wallet.getClient();
                    var data = [];
                    
                    for(var i=0; i<deliveries.length; i++)
                    {
                        var delivery = deliveries[i];
                        
                        client.getAsset(delivery.asset, function(err, asset) {

                            var assetData = JSON.parse(asset.definition_reference.description);
                            var recipient = assetData.to

                            if(assetData.to == req.params.user_id) {

                                data.push(
                                    {
                                        'type': assetData.type,
                                        'from': assetData.from,
                                        'to': assetData.to,
                                        'description': assetData.description,
                                        'key': assetData.key,
                                        'id': delivery._id,
                                        'url': assetData.url
                                    }
                                );
                            }

                            // last one?
                            if(asset.asset_id==deliveries[deliveries.length-1].asset) {
                                res.json(data);
                            }
                        });
                    }
                });
            });
        });
    });
    
    router.route('/user/:user_id/delivery/:delivery_id')
    
    // return a list of all the user's requests
    .get(function(req, res) {
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Delivery.findById(req.params.delivery_id, function(err, delivery) {

                Wallet.findOne(function(err, wallet) {
    
                    var client = wallet.getClient();
                    var data = [];
                    
                    client.getAsset(delivery.asset, function(err, asset) {
                        var assetData = JSON.parse(asset.definition_reference.description);
                        var recipient = assetData.to

                        res.json(
                            {
                                'type': assetData.type,
                                'from': assetData.from,
                                'to': assetData.to,
                                'description': assetData.description,
                                'key': assetData.key,
                                'id': asset.asset_id
                            }
                        );
                    });
                });
            });
        });
    });
};