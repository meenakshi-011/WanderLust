require('dotenv').config();  // Load .env variables first

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Review = require("./models/review.js");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const reviewsRouter = require("./routes/review.js");

// ------------------ DB Connection ------------------
const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// ------------------ App Config ------------------
app.engine("ejs", ejsMate);   // Use ejs-mate for layouts/partials
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // ✅ serve static files (CSS, JS, images)

// ------------------ Sessions & Flash ------------------
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ------------------ Passport Auth ------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------ Middleware (locals) ------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ------------------ Routes ------------------
app.get("/", (req, res) => {
  res.redirect("/listings"); // Default home -> listings
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// ------------------ Error Handler ------------------
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// ------------------ Server ------------------
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
