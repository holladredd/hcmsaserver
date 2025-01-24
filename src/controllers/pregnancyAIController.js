const PregnancyTimeline = require("../models/PregnancyTimeline");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This will now use the key from .env
});

const pregnancyAIController = {
  analyzePregnancyData: async (req, res) => {
    try {
      const { patientId } = req.params;
      const timeline = await PregnancyTimeline.findOne({ patient: patientId })
        .populate("patient")
        .populate("appointments");

      const latestVitals = timeline.vitals[timeline.vitals.length - 1];

      const aiPrompt = `Analyze pregnancy data for week ${timeline.currentWeek}:
        Blood Pressure: ${latestVitals.bloodPressure}
        Weight: ${latestVitals.weight}kg
        Fetal Heart Rate: ${latestVitals.fetalHeartRate}
        Symptoms: ${latestVitals.symptoms.join(", ")}`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a specialized AI for pregnancy monitoring. Provide medical insights and recommendations.",
          },
          {
            role: "user",
            content: aiPrompt,
          },
        ],
        temperature: 0.7,
      });

      const analysis = aiResponse.choices[0].message.content;

      // Parse AI recommendations
      const recommendations = {
        week: timeline.currentWeek,
        nutrition: extractNutritionAdvice(analysis),
        exercise: extractExerciseAdvice(analysis),
        warnings: extractWarnings(analysis),
        nextSteps: extractNextSteps(analysis),
      };

      // Update timeline with AI recommendations
      timeline.aiRecommendations.push(recommendations);
      await timeline.save();

      res.json({
        currentWeek: timeline.currentWeek,
        analysis: recommendations,
        nextAppointment: timeline.appointments[0],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getWeeklyInsights: async (req, res) => {
    try {
      const { patientId, week } = req.params;
      const timeline = await PregnancyTimeline.findOne({
        patient: patientId,
        "aiRecommendations.week": week,
      });

      const weeklyInsight = timeline.aiRecommendations.find(
        (r) => r.week == week
      );
      res.json(weeklyInsight);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePregnancyData: async (req, res) => {
    try {
      const { patientId } = req.params;
      const { vitals } = req.body;

      const timeline = await PregnancyTimeline.findOneAndUpdate(
        { patient: patientId },
        { $push: { vitals: vitals } },
        { new: true }
      );

      // Trigger AI analysis after data update
      const aiAnalysis = await pregnancyAIController.analyzePregnancyData(
        req,
        res
      );

      res.json({
        message: "Pregnancy data updated successfully",
        timeline,
        aiAnalysis,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

// Helper functions to parse AI response
function extractNutritionAdvice(analysis) {
  // Implementation to extract nutrition recommendations
  return analysis.match(/nutrition:.*?(?=\n|$)/gi) || [];
}

function extractExerciseAdvice(analysis) {
  // Implementation to extract exercise recommendations
  return analysis.match(/exercise:.*?(?=\n|$)/gi) || [];
}

function extractWarnings(analysis) {
  // Implementation to extract warning signs
  return analysis.match(/warning:.*?(?=\n|$)/gi) || [];
}

function extractNextSteps(analysis) {
  // Implementation to extract next steps
  return analysis.match(/next steps:.*?(?=\n|$)/gi) || [];
}

module.exports = pregnancyAIController;
