import "./Interview.css";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  generateQuestions,
  evaluateAnswer,
} from "../../services/interviewService";

export default function Interview() {
  const [formData, setFormData] = useState({
    role: "",
    difficulty: "Easy",
    questionCount: 5,
  });

  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [evaluations, setEvaluations] = useState([]);

  const [isInterviewCompleted, setIsInterviewCompleted] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStart = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await generateQuestions({
        role: formData.role,
        difficulty: formData.difficulty,
        questionCount: Number(formData.questionCount),
      });

      setQuestions(response.questions || []);
      setAnswers([]);
      setEvaluations([]);
      setCurrentQuestion(0);
      setIsInterviewCompleted(false);

    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = e.target.value;

    setAnswers(updatedAnswers);
  };

  const evaluateCurrentAnswer = async () => {
    try {

      if (evaluations[currentQuestion]) {
        return true;
      }

      const response = await evaluateAnswer({
        role: formData.role,
        question: questions[currentQuestion],
        answer: answers[currentQuestion] || "",
      });

      const updated = [...evaluations];

      updated[currentQuestion] = response.interview;

      setEvaluations(updated);

      return true;

    } catch (error) {
      console.error(error);

      alert("Failed to evaluate answer.");

      return false;
    }
  };

  const nextQuestion = async () => {

    if (!answers[currentQuestion]?.trim()) {
      alert("Please answer this question first.");
      return;
    }

    const success =
      await evaluateCurrentAnswer();

    if (!success) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }

  };

  const handleSubmitInterview = async () => {

    if (!answers[currentQuestion]?.trim()) {
      alert("Please answer the last question.");
      return;
    }

    const success =
      await evaluateCurrentAnswer();

    if (!success) return;

    setIsInterviewCompleted(true);

  };

  const averageScore =
    evaluations.length === 0
      ? 0
      : Math.round(
          evaluations.reduce(
            (sum, item) => sum + item.score,
            0
          ) / evaluations.length
        );

  const restartInterview = () => {
    setQuestions([]);
    setAnswers([]);
    setEvaluations([]);
    setCurrentQuestion(0);
    setIsInterviewCompleted(false);

    setFormData({
      role: "",
      difficulty: "Easy",
      questionCount: 5,
    });
  };

  return (
    <DashboardLayout>
      <div className="interview-page">
                {questions.length === 0 ? (

          <>
            <div className="interview-header">
              <h1>Mock Interview</h1>

              <p>
                Configure your interview and let AI generate personalized
                questions.
              </p>
            </div>

            <div className="interview-card">

              <form onSubmit={handleStart}>

                <div className="form-group">
                  <label>Job Role</label>

                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. MERN Stack Developer"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Difficulty</label>

                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Questions</label>

                  <select
                    name="questionCount"
                    value={formData.questionCount}
                    onChange={handleChange}
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="start-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Generating..."
                    : "Start Interview"}
                </button>

              </form>

            </div>

          </>

        ) : !isInterviewCompleted ? (

          <div className="question-card">

            <div className="question-header">

              <h2>
                Question {currentQuestion + 1} / {questions.length}
              </h2>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((currentQuestion + 1) /
                        questions.length) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            <div className="question-box">

              <h3>
                {questions[currentQuestion]}
              </h3>

            </div>

            <textarea
              className="answer-box"
              rows="8"
              placeholder="Type your answer..."
              value={answers[currentQuestion] || ""}
              onChange={handleAnswerChange}
            />

            <div className="navigation-buttons">

              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>

              {currentQuestion ===
              questions.length - 1 ? (

                <button
                  type="button"
                  onClick={handleSubmitInterview}
                >
                  Finish Interview
                </button>

              ) : (

                <button
                  type="button"
                  onClick={nextQuestion}
                >
                  Next
                </button>

              )}

            </div>

          </div>

        ) : (
                    <div className="question-card">

            <div className="interview-header">
              <h1>🎉 Interview Completed</h1>

              <p>
                Great job! Here is your interview performance summary.
              </p>
            </div>

            <div className="result-card">

              <h2>Average Score</h2>

              <div className="score-circle">
                {averageScore}/10
              </div>

            </div>

            <div className="feedback-list">

              {evaluations.map((item, index) => (

                <div
                  key={index}
                  className="feedback-card"
                >

                  <h3>
                    Question {index + 1}
                  </h3>

                  <p>
                    <strong>Question:</strong>
                    <br />
                    {questions[index]}
                  </p>

                  <p>
                    <strong>Your Answer:</strong>
                    <br />
                    {answers[index]}
                  </p>

                  <p>
                    <strong>Score:</strong>{" "}
                    {item.score}/10
                  </p>

                  <div className="feedback-box">

                    <strong>AI Feedback</strong>

                    <pre>
                      {item.feedback}
                    </pre>

                  </div>

                </div>

              ))}

            </div>

            <div className="navigation-buttons">

              <button
                type="button"
                onClick={restartInterview}
              >
                Take Another Interview
              </button>

            </div>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}