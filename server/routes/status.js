module.exports = function(router) {
    router.get('/status', function(req, res) {
        res.json({ message: 'up', now: new Date() });   
    });
};