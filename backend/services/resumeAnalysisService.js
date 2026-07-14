const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert ATS Resume Analyzer.

Return ONLY valid JSON.

Do not return markdown.
Do not return explanations.
Do not use \`\`\`.

Return exactly this format:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}
`,
        },

        {
          role: "user",
          content: `
Analyze this resume.

Resume:

${resumeText}
`,
        },
      ],

      temperature: 0.2,

      response_format: {
        type: "json_object",
      },
    });

    const response =
      completion.choices[0].message.content;

    return JSON.parse(response);
  } catch (error) {
    console.error(
      "Resume Analysis Error:",
      error
    );

    throw error;
  }
};

module.exports = {
  analyzeResume,
};