const express = require("express");

const router = express.Router();

const {
  getInterviewQuestions,
  getQuestionHistory,
} = require("../controllers/aiController");

router.post(
  "/questions",
  getInterviewQuestions
);

router.get(
  "/questions/history",
  getQuestionHistory
);

module.exports = router;