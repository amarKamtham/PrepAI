import {
  FaFileAlt,
  FaRobot,
  FaQuestionCircle,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">

      <div
  className="action-card"
  onClick={() => navigate("/resume")}
>
  <FaFileAlt className="action-icon" />

  <h3>Resume Analyzer</h3>

  <p>Upload and analyze your resume.</p>

  <FaArrowRight className="action-arrow" />
</div>

      <div
        className="action-card"
        onClick={() => navigate("/interview")}
      >
        <FaRobot className="action-icon" />
        <h3>Mock Interview</h3>
        <p>Practice with AI interview sessions.</p>
      </div>

      <div
        className="action-card"
        onClick={() => navigate("/questions")}
      >
        <FaQuestionCircle className="action-icon" />
        <h3>Question Generator</h3>
        <p>Generate interview questions.</p>
      </div>

      <div
        className="action-card"
        onClick={() => navigate("/interview-history")}
      >
        <FaHistory className="action-icon" />
        <h3>History</h3>
        <p>Review your previous activities.</p>
      </div>

    </section>
  );
};

export default QuickActions;