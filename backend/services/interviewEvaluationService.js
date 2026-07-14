const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const evaluateAnswer = async (
  role,
  question,
  answer
) => {
  try {
    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
You are a professional technical interviewer.

Role:
${role}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and provide:

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Improved Answer:
...
`,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error(
      "Interview Evaluation Error:",
      error
    );

    throw error;
  }
};

module.exports = {
  evaluateAnswer,
};