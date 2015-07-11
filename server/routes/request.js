var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var Request = require('./../models/request');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user/:user_id/request')
    
    // return a list of all the user's requests
    .get(function(req, res) {
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Request.find(function(err, requests) {
                var data = [];
                
                for(var i=0; i<requests.length; i++) {
                    data.push({
                        'from': requests[i].from, 
                        'to': requests[i].to, 
                        'description': requests[i].description,
                        'key': requests[i].publicKey,
                        'id': requests[i]._id
                    });
                }
                
                res.json(data);
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
                
            var keyPair = bitcoin.ECKey.makeRandom()
            var privateKey = keyPair.toWIF();
            var publicKey = keyPair.pub.getAddress().toString();

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
                        console.log(response);
                        request.asset = response.asset_id;
                        request.save();

                        User.findOne({'username': from}, function(err, to_user) {
                            client.issueAsset(response.asset_id, 
                            [{
                                bucket_id:to_user.bucket,
                                amount:JSON.parse(to).length
                            }], function(err, response) {
                              res.json({
                                  "id":request._id,
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

            Request.findById(req.params.request_id, function(err, request) {
                res.json({
                    'from': request.from, 
                    'to': request.to, 
                    'description': request.description,
                    'key': request.key
                })
            });
        });
    })
    
    .post(function(req, res) {
      
      
      
      
        var buf = new Buffer(req.body.file.toString('binary'),'binary');

        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);
                
            
            Request.findById(req.params.request_id, function(err, request) {
                
                var publicKey = request.publicKey;
                var privateKey = request.privateKey;
                
                var to = JSON.parse(request.to);
                var from = request.from;
                
                Wallet.findOne(function(err, wallet) {
    
                    for(var i = 0; i<to.length; i++) {
                        
                        var client = wallet.getClient();


                        User.findOne({'username': from}, function(err, from_user) {
    
                            User.findOne({'username': to[i]}, function(err, to_user) {
                                
                                // transfering assets probably isn't what we want to do here
                                // instead we need a new private/public key generated, and
                                // send the one key to the recipient while enoding the private 
                                // key with the asset public key before sending to the 
                                // recipient in an asset
                                
                                client.transferAsset([{
                                    bucket_id: from_user.bucket,
                                    asset_id: request.asset,
                                    amount: 1
                                }], {
                                    bucket_id: to_user.bucket,
                                    amount: 1
                                }, function(err, response){})
                                
                            });
                        });
                    }
                });
                
                // encrypt!
                res.write(buf);
            });
        });
    });
    
    // return a binary qr code image for a specific request
    router.route('/user/:user_id/request/:request_id/qrcode')
    .get(function(req, res) {
    
        User.findOne({'username': req.params.user_id}, function(err, user) {
            if (err)
                res.send(err);

            Request.findById(req.params.request_id, function(err, request) {

                var qr = require('qr-image');  
                var fs = require('fs');
                
                var code = qr.image(request.privateKey, { type: 'png' });  
                res.type('png');
                code.pipe(res);  

            });
        });
    });
};