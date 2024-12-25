const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      phone: String,
      email: String,
    },
    services: [String],
    operatingHours: {
      type: Map,
      of: String,
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: Number,
        review: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facility", facilitySchema);
