
module.exports = function(router) {

    router.route('/event')
    .get(function(req, res) {
        console.log(req.body);
        res.json({ 'ten':'four' });   
    })
    .post(function(req, res) {
        console.log(req.body);
        res.json({ 'ten':'four' });   
    });

};