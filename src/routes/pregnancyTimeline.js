const router = require("express").Router();
const pregnancyAIController = require("../controllers/pregnancyAIController");
const { authenticateToken } = require("../middleware/auth");

router.get(
  "/analyze/:patientId",
  authenticateToken,
  pregnancyAIController.analyzePregnancyData
);
router.get(
  "/insights/:patientId/:week",
  authenticateToken,
  pregnancyAIController.getWeeklyInsights
);
router.post(
  "/update/:patientId",
  authenticateToken,
  pregnancyAIController.updatePregnancyData
);

module.exports = router;
