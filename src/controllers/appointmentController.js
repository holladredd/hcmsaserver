const Appointment = require("../models/Appointment");

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const newAppointment = new Appointment({
        patient: req.user.id,
        ...req.body,
      });
      const savedAppointment = await newAppointment.save();
      res.status(201).json(savedAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate("patient", "username email")
        .populate("doctor", "username email");
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id)
        .populate("patient", "username email")
        .populate("doctor", "username email");
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(req.params.id);
      res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = appointmentController;
