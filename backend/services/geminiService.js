const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateInterviewQuestions = async (role) => {
  try {
    const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

    const prompt = `
Generate 10 interview questions for a ${role} position.
Return only the questions.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  generateInterviewQuestions,
};