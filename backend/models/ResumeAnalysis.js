const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  extractedText: {
    type: String,
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  strengths: {
    type: [String],
    default: [],
  },

  weaknesses: {
    type: [String],
    default: [],
  },

  missingSkills: {
    type: [String],
    default: [],
  },

  suggestions: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);