const express = require("express");
const router = express.Router();
const User = require("../models/user");  // Correct import of User model
const passport = require("passport");
const session = require("express-session");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust !");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect("/listings/new");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
});

// Wishlist viewing route
router.get("/my-wishlist", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to view your wishlist");
    return res.redirect("/login");
  }
  const user = await User.findById(req.user._id).populate("wishlist");
  res.render("users/wishlist", { listings: user.wishlist });
});

module.exports = router;
