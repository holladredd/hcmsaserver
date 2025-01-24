const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const { authenticateToken } = require("../middleware/auth");

// Use proper callback functions for each route
router.get("/", authenticateToken, (req, res) => {
  appointmentController.getAppointments(req, res);
});

router.post("/", authenticateToken, (req, res) => {
  appointmentController.createAppointment(req, res);
});

router.get("/:id", authenticateToken, (req, res) => {
  appointmentController.getAppointmentById(req, res);
});

router.put("/:id", authenticateToken, (req, res) => {
  appointmentController.updateAppointment(req, res);
});

router.delete("/:id", authenticateToken, (req, res) => {
  appointmentController.deleteAppointment(req, res);
});

module.exports = router;
