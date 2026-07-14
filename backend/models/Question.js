const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    questionCount: {
      type: Number,
      required: true,
    },

    questions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);