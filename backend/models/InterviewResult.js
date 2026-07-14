const mongoose = require("mongoose");

const interviewResultSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    feedback: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewResult",
  interviewResultSchema
);