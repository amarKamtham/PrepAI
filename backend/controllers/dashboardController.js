const InterviewResult = require("../models/InterviewResult");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const Question = require("../models/Question");

const getDashboardStats = async (req, res) => {
  try {
    const interviews = await InterviewResult.find({
      user: req.user.id,
    });

    const totalInterviews = interviews.length;

    const totalResumeAnalyses =
      await ResumeAnalysis.countDocuments({
        user: req.user.id,
      });

    // Temporary until Question model supports user ownership
   const totalQuestionsGenerated =
  await Question.countDocuments({
    user: req.user.id,
  });

    let averageInterviewScore = 0;

    const validScores = interviews.filter(
      (item) => typeof item.score === "number"
    );

    if (validScores.length > 0) {
      const totalScore = validScores.reduce(
        (sum, item) => sum + item.score,
        0
      );

      averageInterviewScore =
        totalScore / validScores.length;
    }

    res.status(200).json({
      success: true,
      stats: {
        totalInterviews,
        totalResumeAnalyses,
        totalQuestionsGenerated,
        averageInterviewScore,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};