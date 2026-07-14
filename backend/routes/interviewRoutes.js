const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  evaluateInterviewAnswer,
  getInterviewHistory,
} = require("../controllers/interviewController");

router.post(
  "/evaluate",
  protect,
  evaluateInterviewAnswer
);

router.get(
  "/history",
  protect,
  getInterviewHistory
);

module.exports = router;