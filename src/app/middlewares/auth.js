function auth(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'customer') {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = auth;