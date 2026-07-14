const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateInterviewQuestions = async (
  role,
  difficulty,
  questionCount
) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Generate exactly ${questionCount} interview questions.

Role: ${role}

Difficulty: ${difficulty}

Rules:

- Return exactly ${questionCount} questions.
- Questions should match the ${difficulty} difficulty level.
- Do not generate more or fewer questions.
- Return only a numbered list.
`,
        },
      ],
     model: "llama-3.3-70b-versatile"
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

module.exports = {
  generateInterviewQuestions,
};