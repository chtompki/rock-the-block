var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var Wallet = require('./../models/request');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {
    router.route('/user/:user_id/request')

    .get(function(req, res) {
    
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
                
            Wallet.findOne(function(err, wallet) {
                var client = wallet.getClient();
                
                client.getBucketAssetBalance(user.bucket, function(err, response){
                    
                    var assets = response;
                    for(var i=i<assets.length; i++;) {
                        var asset = response[i];
                        if(asset.asset_type==="open_assets")
                        {
                            
                        }
                    }
                    
                
                });
                
            });
        });
    })
    
    .post(function(req, res) {
        var from = req.body.from;
        var to = req.body.to;
        var description = req.body.description;
        
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
                
            var keyPair = bitcoin.ECKey.makeRandom()
            var privateKey = keyPair.toWIF();
            var publicKey = keyPair.pub.getAddress().toString();

            var request = new Request();
            request.from = from;
            request.to = to;
            request.description = description;
            request.key = publicKey;
            
            request.save(function(err) {
                if (err)
                    res.send(err);
                    
                Wallet.findOne(function(err, wallet) {
                    var client = wallet.getClient();
                    var assetMetaData = {
                        'from': from, 
                        'to': to, 
                        'description': description,
                        'key': publicKey
                    };
                    var assetDefinition = {description: JSON.stringify(assetMetaData)};
                    client.createAsset(wallet.id, {
                        definition_mutable:false, 
                        definition:assetDefinition, 
                        description_mime:'application/json',
                        definition_url: 'https://bithack-crazyatlantaguy.c9.io/api/request/'+request._id
                    }, function(err, response){
                        User.findOne({'username': from}, function(err, to_user) {
                            client.issueAsset(response.asset_id, 
                            [{
                                bucket_id:to_user.bucket,
                                amount:1
                            }], function(err, response) {
                              res.json({
                                  "status":"success",
                                  "key":privateKey
                              });  
                            });
                        });
                    });
                });
            });
        });
    });
};