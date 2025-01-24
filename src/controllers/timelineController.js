const Timeline = require("../models/Timeline");

const timelineController = {
  createTimelineEvent: async (req, res) => {
    try {
      const newEvent = new Timeline({
        user: req.user.id,
        ...req.body,
      });
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTimeline: async (req, res) => {
    try {
      const timeline = await Timeline.find()
        .populate("user", "username email")
        .sort({ date: -1 });
      res.json(timeline);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTimelineEventById: async (req, res) => {
    try {
      const event = await Timeline.findById(req.params.id).populate(
        "user",
        "username email"
      );
      if (!event)
        return res.status(404).json({ message: "Timeline event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTimelineEvent: async (req, res) => {
    try {
      const updatedEvent = await Timeline.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTimelineEvent: async (req, res) => {
    try {
      await Timeline.findByIdAndDelete(req.params.id);
      res.json({ message: "Timeline event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = timelineController;
