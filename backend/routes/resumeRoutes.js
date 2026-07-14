const express = require("express");

const router = express.Router();

const upload = require("../middleware/multerConfig");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadResume,
  getResumeHistory,
} = require("../controllers/resumeController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/history",
  authMiddleware,
  getResumeHistory
);

module.exports = router;