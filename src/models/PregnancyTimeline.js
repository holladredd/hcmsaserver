const mongoose = require("mongoose");

const pregnancyTimelineSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    currentWeek: {
      type: Number,
      min: 1,
      max: 42,
    },
    vitals: [
      {
        date: Date,
        bloodPressure: String,
        weight: Number,
        fetalHeartRate: Number,
        symptoms: [String],
      },
    ],
    aiRecommendations: [
      {
        week: Number,
        nutrition: [String],
        exercise: [String],
        warnings: [String],
        nextSteps: [String],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PregnancyTimeline", pregnancyTimelineSchema);
