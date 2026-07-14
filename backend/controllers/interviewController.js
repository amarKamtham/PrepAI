const { evaluateAnswer } = require("../services/interviewEvaluationService");
const InterviewResult = require("../models/InterviewResult");

const evaluateInterviewAnswer = async (req, res) => {
  try {
    const { role, question, answer } = req.body;

    if (!role || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Role, question and answer are required",
      });
    }

    const feedback = await evaluateAnswer(
      role,
      question,
      answer
    );

    const scoreMatch = feedback.match(/(\d+)\/10/);

    const score = scoreMatch
      ? Number(scoreMatch[1])
      : 0;

    const interview = await InterviewResult.create({
      user: req.user.id,
      role,
      question,
      answer,
      feedback,
      score,
    });

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {
    console.error("Interview Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Interview evaluation failed",
    });
  }
};

const getInterviewHistory = async (req, res) => {
  try {
    const history = await InterviewResult.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });

  } catch (error) {
    console.error("Interview History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch interview history",
    });
  }
};

module.exports = {
  evaluateInterviewAnswer,
  getInterviewHistory,
};