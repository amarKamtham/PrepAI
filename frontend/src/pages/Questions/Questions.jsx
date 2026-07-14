import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { generateQuestions } from "../../services/interviewService";
import { FiCpu } from "react-icons/fi";
import "./Questions.css";

export default function Questions() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!role.trim()) return alert("Please specify a target job role.");

    setLoading(true);
    try {
      const payload = { role, difficulty, questionCount: Number(questionCount) };
    const data = await generateQuestions(payload);
setQuestions(data.questions || []);
    } catch (error) {
      console.error("Generation failed:", error);
      alert(error.message || "Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };
  const copyAllQuestions = async () => {
  try {
    const text = questions
      .map((question, index) => `${index + 1}. ${question}`)
      .join("\n\n");

    await navigator.clipboard.writeText(text);

    alert("Questions copied successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to copy questions.");
  }
};

  return (
    <DashboardLayout>
      <div className="questions-page">
        <div className="questions-header">
          <h2>AI Question Generator</h2>
          <p>Generate highly tailored interview questions for your desired role instantly.</p>
        </div>

        <div className="questions-card">
          <form onSubmit={handleGenerate} className="generator-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Target Job Role</label>
                <input
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={loading}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of Questions</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  disabled={loading}
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
              </div>
            </div>

            <button type="submit" className="generate-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <FiCpu />
                  <span>Generate Questions</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Question display list placeholder for next steps */}
       {questions.length > 0 && (
  <div className="results-container">
    <div className="results-header">
  <h3>Generated Questions</h3>

  <div className="results-actions">
    <button
      className="copy-btn"
      onClick={copyAllQuestions}
    >
      Copy All
    </button>

    <button
      className="clear-btn"
      onClick={() => setQuestions([])}
    >
      Clear
    </button>
  </div>
</div>

    <div className="questions-list">
      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <div className="question-number">
            {index + 1}
          </div>

          <p>
            {typeof question === "string"
              ? question
              : question.question}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </DashboardLayout>
  );
}