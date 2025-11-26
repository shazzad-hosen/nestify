const mongoose = require("mongoose");
const Review = require("./review.model.js");
const { required } = require("joi");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Iconic Cities",
      "Rooms",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Farms",
      "Camping",
      "Arctic",
      "Beaches",
      "Rivers",
      "Modern Cities",
      "Others",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Handling Review Deletion after delete a listing
listingSchema.post("findOneAndDelete", async (listingData) => {
  if (listingData) {
    await Review.deleteMany({ _id: { $in: listingData.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
