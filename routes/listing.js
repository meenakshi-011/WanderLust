const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const {listingSchema, reviewSchema} = require("../schema.js");
const validateListing = ( req,res,next) => {
   let {error} = listingSchema.validate(req.body);
   if  (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,result.errMsg);
   } else {
    next();
   }
 };
const ExpressError = require("../FigletDir/utils/ExpressError");

// Authorization middleware
const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


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
router.post("/",  async (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
      return res.redirect("/login");
    }
  const newListing = new Listing({
    ...req.body.listing,
    owner: req.user._id
  });
  await newListing.save();
  req.flash("success", "New Listing is Created!");
  res.redirect("/listings");
});
// edit route
router.get("/:id/edit", isOwner, async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
});
//update Route
router.put("/:id", isOwner, async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
router.delete("/:id", isOwner, async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

module.exports = router;