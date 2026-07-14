const { parsePDF } = require("../services/pdfParserService");

const {
  analyzeResume,
} = require("../services/resumeAnalysisService");

const ResumeAnalysis = require(
  "../models/ResumeAnalysis"
);

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume PDF",
      });
    }

    const extractedText = await parsePDF(req.file.path);

    const analysis =
      await analyzeResume(extractedText);

  await ResumeAnalysis.create({
  user: req.user.id,

  fileName: req.file.originalname,
  extractedText,

  score: analysis.score,
  strengths: analysis.strengths,
  weaknesses: analysis.weaknesses,
  missingSkills: analysis.missingSkills,
  suggestions: analysis.suggestions,
});

   res.status(200).json({
  success: true,
  message: "Resume analyzed successfully",

  score: analysis.score,
  strengths: analysis.strengths,
  weaknesses: analysis.weaknesses,
  missingSkills: analysis.missingSkills,
  suggestions: analysis.suggestions,
});

  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};

const getResumeHistory = async (req, res) => {
  try {
    const history = await ResumeAnalysis.find({
  user: req.user.id,
}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });

  } catch (error) {
    console.error("Resume History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resume history",
    });
  }
};

module.exports = {
  uploadResume,
  getResumeHistory,
};