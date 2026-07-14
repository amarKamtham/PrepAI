const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getInterviewQuestions,
  getQuestionHistory,
} = require("../controllers/aiController");

router.post(
  "/questions",
  protect,
  getInterviewQuestions
);

router.get(
  "/questions/history",
  protect,
  getQuestionHistory
);

module.exports = router;