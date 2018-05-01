var exports = module.exports = {}

exports.signUp = function(req, res) {
    res.render('signup');
    // console.log(res);
};
// console.log(exports.signUp);
exports.signIn = function(req, res) {
    res.render('signin');
    // console.log(res);
};
// console.log(exports.signIn);
exports.dashBoard = function(req, res) {
    res.render('dashboard');
    // console.log(res);
};
// console.log(exports.dashBoard);
exports.logOut = function(req, res) {
    res.session.destroy(function(err) {
        res.redirect('/');
        // console.log(res);
    });
};
// console.log(exports.logOut);
// console.log(exports);
// what actually needs to be required here