const express = require("express");
const ExpressError = require("./utils/ExpressError");   
const { listingSchema, reviewSchema } = require("./schema.js");

const validateListing = ( req,res,next) => {
   let {error} = listingSchema.validate(req.body);
   if  (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else {
    next();
   }
 };

 
 const validateReview = ( req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if  (error) {
     let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400,errMsg);
    } else {
     next();
    }
  };

  module.exports = {
    validateListing,
    validateReview
  };
 
