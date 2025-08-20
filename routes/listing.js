const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const User = require("../models/user");
const { listingSchema, reviewSchema } = require("../schema.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index Route with Filtering and Sorting
router.get("/", async (req, res) => {
  const { region, topic, sort } = req.query;

  const filter = {};
  if (region) filter.region = region;
  if (topic) filter.topic = topic;

  // Default sorting by latest (newest first)
  let sortOption = { createdAt: -1 };

  if (sort === "popular") sortOption = { views: -1 }; // Ensure "views" exists in schema
  if (sort === "recommended") sortOption = { rating: -1 }; // Ensure "rating" exists in schema

  try {
    const alllistings = await Listing.find(filter).sort(sortOption);
    res.render("listings/index", { alllistings });
  } catch (e) {
    console.error("Error in filtering:", e);
    req.flash("error", "Could not fetch filtered listings.");
    res.redirect("/listings");
  }
});

// New Route
router.get("/new", (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create listing");
    return res.redirect("/login");
  }
  res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let isInWishlist = false;
  if (req.isAuthenticated()) {
    const user = await User.findById(req.user._id);
    isInWishlist = user.wishlist.some(
      (wishlistId) => wishlistId.toString() === id.toString()
    );
  }

  res.render("listings/show.ejs", { listing, isInWishlist });
});

// Create Route
router.post("/login", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create listing");
    return res.redirect("/login");
  }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "New Listing is Created!");
  res.redirect("/listings");
});

// Edit Route
router.get("/:id/edit", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to edit listing");
    return res.redirect("/login");
  }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
});

// Update Route
router.put("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to update listing");
    return res.redirect("/login");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// Delete Route
router.delete("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to delete listing");
    return res.redirect("/login");
  }
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

// Add to Wishlist Route
router.post("/:id/wishlist", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to save listings");
    return res.redirect("/login");
  }
  const listingId = req.params.id;
  await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: listingId } }
  );
  req.flash("success", "Added to your wishlist!");
  res.redirect(`/listings/${listingId}`);
});

// Remove from Wishlist Route
router.post("/:id/unwishlist", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to remove listings");
    return res.redirect("/login");
  }
  const listingId = req.params.id;
  await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: listingId } }
  );
  req.flash("success", "Removed from your wishlist!");
  res.redirect(`/listings/${listingId}`);
});

module.exports = router;
