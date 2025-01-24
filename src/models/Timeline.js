const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
    },
    milestone: {
      type: String,
      required: true,
    },
    description: String,
    recommendations: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Timeline", timelineSchema);
