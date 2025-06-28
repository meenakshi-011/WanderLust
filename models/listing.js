const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");
const router = express.Router();
const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: String,
    price: Number,
    location: String,
    image:  {
        type: String,
        default:"https://unsplash.com/photos/view-of-seashore-sunset-tNDvFkxkBHo",
       set: (v) => 
        v === "" ?
        "https://unsplash.com/photos/view-of-seashore-sunset-tNDvFkxkBHo" :v,
   },
   price:Number,
   location:String,
   country: String,
   reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }
   ],
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;