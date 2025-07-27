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


//Index Route
router.get("/", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index", { alllistings });
});

//New Route
router.get("/new", (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
        return res.redirect("/login");
    }
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

    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
      return res.redirect("/login");
    }
  await newListing.save();
  req.flash("success", "New Listing is Created!");
  res.redirect("/listings");
});
// edit route
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
  }
  res.render("listings/edit.ejs", { listing });
});
//update Route
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

module.exports = router;