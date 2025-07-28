const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
const Review = require("./models/review");

const listingsRouter = require("./routes/listing");
const userRouter = require("./routes/user");
const reviewsRouter = require("./routes/review");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Database connection
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// View engine setup
app.engine("ejs", ejsMate); // Use ejs-mate as the engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session and Flash
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash message middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { statuscode = 500, message = "Something went wrong" } = err;
  res.status(statuscode).render("error", { message });
});

// Start server
app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
