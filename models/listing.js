const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/view-of-seashore-sunset-tNDvFkxkBHo",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/view-of-seashore-sunset-tNDvFkxkBHo"
        : v,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  // ✅ Newly Added Fields:
  region: String,             // e.g. 'Asia', 'Europe'
  topic: String,              // e.g. 'Camping', 'Rooms'
  views: {
    type: Number,
    default: 0,               // Popularity metric
  },
  rating: {
    type: Number,
    default: 0,               // Recommendation metric
  },
  createdAt: {
    type: Date,
    default: Date.now,        // Sort by newest
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
