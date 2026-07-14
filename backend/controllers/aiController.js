const {
  generateInterviewQuestions,
} = require("../services/groqService");

const Question = require("../models/Question");

const getInterviewQuestions = async (req, res) => {
  try {
    const { role, difficulty, questionCount } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const questionsText = await generateInterviewQuestions(
  role,
  difficulty,
  questionCount
);

const questionsArray = questionsText
  .split("\n")
  .filter((q) => q.trim() !== "");

const savedQuestion = await Question.create({
  role,
  difficulty,
  questionCount,
  questions: questionsArray,
});

res.status(200).json({
  success: true,
  role,
  questions: savedQuestion.questions,
});
  } catch (error) {
    console.error("Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
    });
  }
};

const getQuestionHistory = async (req, res) => {
  try {
    const history = await Question.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

module.exports = {
  getInterviewQuestions,
  getQuestionHistory,
};