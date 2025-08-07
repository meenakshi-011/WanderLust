const express = require("express");
const router = express.Router();
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn} = require("../middleware.js");




//Reviews 
router.post("/", isLoggedIn, validateReview, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","New Review Created");
  res.redirect(`/listings/${listing._id}`);
});

//Delete Reviews Route
router.delete("/:reviewId", isLoggedIn, async (req,res) => {
  let {id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
   res.redirect(`/listings/${id}`);
});

module.exports = router;
