const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require('ejs-mate');
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./routes/review.js");
const listings = require("./routes/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const userRouter = require("./routes/user");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; 

main()                 
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)  => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});


app.get("/", (req, res) => {
  res.send("Hi i am root");
});
 


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/listings", listings);



 const validateListing = ( req,res,next) => {
   let {error} = listingSchema.validate(req.body);
   if  (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,result.errMsg);
   } else {
    next();
   }
 };

 const validateReview = ( req,res,next) => {
   let {error} = reviewSchema.validate(req.body);
   if  (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,result.errMsg);
   } else {
    next();
   }
 };


// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: 'meenakshi@gmail.com',
//     username: "meenakshi-patel"
//   });
//   let registerdUser = await User.register(fakeUser, "helloworld");
//   res.send(registerdUser);
// });

 app.use("/", userRouter);

//Index Route
app.get("/listings", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index", { alllistings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});


//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", { listing });
});
// Create route 
app.post("/listings", validateListing,async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});
// edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update Route
app.put("/listings/:id",validateListing, async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
//Reviews 
app.post("/listings/:id/reviews", validateReview, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
});

//Delete Reviews Route
app.delete("/listings/:id/reviews/:reviewId", async (req,res) => {
  let {id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);

   res.redirect(`/listings/${id}`);
});

//app.get("/testlisting", async(req,res) =>{
//   let samplelisting = new Listing({
//     title:"My New Villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangutte, Goa",
//     country:"india",
//   });

//  await samplelisting.save();
//  console.log("sample was saved");
//  res.send("successful testing");
// });
app.use((err, req, res, next) => {
  const { statuscode = 500, message = "something went wrong" } = err;
  res.status(statuscode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});


