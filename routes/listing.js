const express = require("express");
const router = express.Router();
const wrapAsync = require("../FigletDir/utils/wrapAsync.js");
const Listing = require("../models/listing");
const {isLoggedIn, validateListing} = require("../middleware.js");
const {listingSchema, reviewSchema} = require("../schema.js");

//Index Route
router.get("/", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index", { alllistings });
});

//New Route
router.get("/new",isLoggedIn,  (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
        return res.redirect("/login");
    }
  res.render("listings/new.ejs"); 
});


//Show Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
});

// Create route 
router.post("/login",  async (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
      return res.redirect("/login");
    }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "New Listing is Created!");
  res.redirect("/listings");
});
// edit route
router.get("/:id/edit",isLoggedIn,  async (req, res) => {
    
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
});
//update Route
router.put("/:id",isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
router.delete("/:id",isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

module.exports = router;