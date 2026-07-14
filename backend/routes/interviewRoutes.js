const express = require("express");

const router = express.Router();

const {
  evaluateInterviewAnswer,
  getInterviewHistory,
} = require("../controllers/interviewController");

router.post(
  "/evaluate",
  evaluateInterviewAnswer
);
router.get(
  "/history",
  getInterviewHistory
);

module.exports = router;