 function isLoggedIn(req,res,next)  {
    if (req.isAuthenticated()) {
        return next();
    }
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
module.exports = {isLoggedIn};