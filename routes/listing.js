const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const {listingSchema, reviewSchema} = require("../schema.js");
const { validateListing } = require("../middleware.js");

//Index Route
// Index Route with Filtering and Sorting
router.get("/", async (req, res) => {
  const { region, topic, sort } = req.query;

  const filter = {};
  if (region) filter.region = region;
  if (topic) filter.topic = topic;

  // Default sorting by latest (newest first)
  let sortOption = { createdAt: -1 };

  if (sort === "popular") sortOption = { views: -1 };        // Ensure "views" exists in schema
  if (sort === "recommended") sortOption = { rating: -1 };    // Ensure "rating" exists in schema

  try {
    const alllistings = await Listing.find(filter).sort(sortOption);
    res.render("listings/index", { alllistings });
  } catch (e) {
    console.error("Error in filtering:", e);
    req.flash("error", "Could not fetch filtered listings.");
    res.redirect("/listings");
  }
});


//New Route
router.get("/new", (req, res) => {
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
router.post("/", validateListing, async (req, res, next) => {
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
router.get("/:id/edit", async (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to edit listing");
      return res.redirect("/login");
    }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
});
//update Route
router.put("/:id",validateListing, async (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to update  listing");
      return res.redirect("/login");
    }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to delete listing");
      return res.redirect("/login");
    }
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

module.exports = router;