const Facility = require("../models/Facility");

const facilityController = {
  createFacility: async (req, res) => {
    try {
      const newFacility = new Facility(req.body);
      const savedFacility = await newFacility.save();
      res.status(201).json(savedFacility);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllFacilities: async (req, res) => {
    try {
      const facilities = await Facility.find();
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getFacilityById: async (req, res) => {
    try {
      const facility = await Facility.findById(req.params.id);
      if (!facility)
        return res.status(404).json({ message: "Facility not found" });
      res.json(facility);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateFacility: async (req, res) => {
    try {
      const updatedFacility = await Facility.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedFacility);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteFacility: async (req, res) => {
    try {
      await Facility.findByIdAndDelete(req.params.id);
      res.json({ message: "Facility deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = facilityController;
