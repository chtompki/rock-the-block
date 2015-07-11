var User = require('./../models/user');
var Wallet = require('./../models/wallet');
var bitcoin = require('bitcoinjs-lib');

module.exports = function(router) {

    router.route('/user')
    
    // return an authentication for a user given a username and password
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

    // return a list of usernames in the system
    .get(function(req, res) {
        var usernames = [];
        User.find(function(err, users) {
            if (err)
                res.send(err);
            for(var i=0; i<users.length; i++) {
                usernames.push(users[i].username);
            }
            res.json(usernames);
        });
    });
};