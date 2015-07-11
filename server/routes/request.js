var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var Request = require('./../models/request');
var Delivery = require('./../models/delivery');
var bitcoin = require('bitcoinjs-lib');
var ursa = require('ursa');

module.exports = function(router) {

    router.route('/user/:user_id/request')
    
    // return a list of all the user's requests
    .get(function(req, res) {
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Request.find({from:req.params.user_id}, function(err, requests) {
                console.log(requests)
                if(requests.length==0) {
                    res.json([]);
                } else {
                    Wallet.findOne(function(err, wallet) {
                        var client = wallet.getClient();
                        var data = [];
                        
                        for(var i=0; i<requests.length; i++) {
                            var request = requests[i];
                            client.getAsset(request.asset, function(err, asset) {
                                var assetData = JSON.parse(asset.definition_reference.description);
                                assetData.id = asset.asset_id;
                                data.push(assetData);
                                if(data.length===requests.length) {
                                    res.json(data);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
    
    // create a new request
    router.route('/user/:user_id/request')
    .post(function(req, res) {
        var from = req.body.from;
        var to = req.body.to;
        var description = req.body.description;
        
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
                
            var keyPair = ursa.generatePrivateKey(512, 65537);
            var privateKey = keyPair.toPrivatePem().toString('utf8');
            var publicKey = keyPair.toPublicPem().toString('utf8');

            var request = new Request();
            request.from = from;
            request.to = to;
            request.description = description;
            request.publicKey = publicKey;
            request.privateKey = privateKey;
            
            request.save(function(err) {
                if (err)
                    res.send(err);
                    
                Wallet.findOne(function(err, wallet) {
                    var client = wallet.getClient();
                    var assetMetaData = {
                        'type': 'delivery',
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
                        definition_url: 'https://bithack-crazyatlantaguy.c9.io/api/user/'+req.params.user_id+'/request/'+request._id
                    }, function(err, response){
                        request.asset = response.asset_id;
                        request.save();

                        User.findOne({'username': from}, function(err, to_user) {
                            client.issueAsset(response.asset_id, 
                            [{
                                bucket_id:to_user.bucket,
                                amount:JSON.parse(to).length
                            }], function(err, response) {
                              res.json({
                                  "id":request.asset,
                                  "key":privateKey,
                              });  
                            });
                        });
                    });
                });
            });
        });
    });
    
    
    // return details concerning a specific request
    router.route('/user/:user_id/request/:request_id')
    .get(function(req, res) {
    
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
            Request.findOne({'asset':req.params.request_id}, function(err, request) {
                Wallet.findOne(function(err, wallet) {
                    var client = wallet.getClient();
                    client.getAsset(request.asset, function(err, asset) {
                        res.json(JSON.parse(asset.definition_reference.description));
                    })
                });
            });
        });
    })
    
    .post(function(req, res) {

        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
                
            
            Request.findOne({'asset':req.params.request_id}, function(err, request) {
                
                var myKeyPair = ursa.generatePrivateKey(512, 65537);

                Wallet.findOne(function(err, wallet) {
    
                    var client = wallet.getClient();

                    client.getAsset(request.asset, function(err, asset) {

                        var assetData = JSON.parse(asset.definition_reference.description);

                        // encrypt the file with my public key
                        var fileOutput = myKeyPair.encrypt(req.body.file, 'utf8', 'base64');

                        // encrypt my private key with the request public key
                        var theirPublicKey = assetData.key;
                        var myEncryptedPrivateKey = 'blah'; //TODO ursa.createPublicKey(theirPublicKey).encrypt(myKeyPair.toPrivatePem(), 'utf8', 'base64')

                        res.contentType('application/octet-stream');
                        res.end(fileOutput);

                        var recipients = JSON.parse(assetData.to);

                        for(var i = 0; i<recipients.length; i++) {

                            User.findOne({'username': recipients[i]}, function(err, to_user) {
                                console.log(recipients[i]+" "+to_user);
                                    
                                var delivery = new Delivery();
                                delivery.from = assetData.from;
                                delivery.to = to_user.username
                                delivery.description = assetData.description;
                                delivery.privateKey = myEncryptedPrivateKey;
                                delivery.url = req.body.url;
                                
                                delivery.save(function() {
        
                                    var assetMetaData = {
                                        'type': 'request',
                                        'from': delivery.from, 
                                        'to': to_user.username, 
                                        'description': delivery.description,
                                        'key': delivery.privateKey,
                                        'url': delivery.url
                                    };
                                    var assetDefinition = {description: JSON.stringify(assetMetaData)};
                                    
                                    client.createAsset(wallet.id, {
                                        definition_mutable:false, 
                                        definition:assetDefinition, 
                                        description_mime:'application/json',
                                        definition_url: 'https://bithack-crazyatlantaguy.c9.io/api/user/'+req.params.user_id+'/delivery/'+delivery._id
                                    }, function(err, response){
                                        delivery.asset = response.asset_id;
                                        delivery.save();
    
                                        client.issueAsset(response.asset_id, 
                                        [{
                                            bucket_id:to_user.bucket,
                                            amount:1
                                        }], function(err, response) {
                                            console.log("success");
                                        });
                                    });                                
                                });
                            });
                        }
                    });
                });
            });
        });
    });
    
    // return a binary qr code image for a specific request
    router.route('/user/:user_id/request/:request_id/qrcode')
    .get(function(req, res) {
    
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Request.findOne({'asset':req.params.request_id}, function(err, request) {

                var qr = require('qr-image');  
                var fs = require('fs');
                
                var code = qr.image(request.privateKey, { type: 'png' });  
                res.type('png');
                code.pipe(res);  
            });
        });
    });
};