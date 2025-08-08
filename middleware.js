const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to access this feature!");
        return res.redirect("/login");
    }
    next();
};

module.exports = { isLoggedIn };
