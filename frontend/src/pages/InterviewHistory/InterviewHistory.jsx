import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getInterviewHistory } from "../../services/interviewService";
import { FiSearch, FiCalendar, FiAward, FiArrowRight } from "react-icons/fi";
import "./InterviewHistory.css";

export default function InterviewHistory() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

 const fetchHistory = async () => {
  try {
    const response = await getInterviewHistory();

setHistory(response.history || []);
setFilteredHistory(response.history || []);
  } catch (error) {
    console.error("Failed to fetch interview history:", error);
  } finally {
    setLoading(false);
  }
};

  // Real-time local filtering by Role
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = history.filter((item) =>
      item.role?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

  // Helper to determine score badge styling
  const getScoreClass = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 50) return "score-mid";
    return "score-low";
  };
  const formatScore = (score) => {
  if (score == null) return "0%";

  return score <= 10
    ? `${score * 10}%`
    : `${Math.round(score)}%`;
};
const validScores = filteredHistory.filter(
  (item) => typeof item.score === "number"
);

const totalInterviews = filteredHistory.length;

const averageScore =
  validScores.length > 0
    ? Math.round(
        validScores.reduce((sum, item) => sum + item.score, 0) /
          validScores.length
      )
    : 0;

const bestScore =
  totalInterviews > 0
    ? Math.max(...filteredHistory.map((item) => item.score || 0))
    : 0;

  return (
    <DashboardLayout>
      <div className="history-page">
        <div className="history-header">
          <div>
            <h2>Interview History</h2>
           <p className="subtitle">
  {filteredHistory.length}{" "}
  {filteredHistory.length === 1 ? "Interview" : "Interviews"} Found
</p>
          </div>
          
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by job role..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Fetching your records...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="empty-state">
            <FiAward className="empty-icon" />
            <h3>No Interviews Found</h3>
            <p>{searchTerm ? "No records match your search query." : "You haven't taken any mock interviews yet!"}</p>
          </div>
       ) : (
  <>
    <div className="history-stats">
      <div className="stat-card">
        <h3>{totalInterviews}</h3>
        <p>Total Interviews</p>
      </div>

      <div className="stat-card">
        <h3>{formatScore(averageScore)}</h3>
        <p>Average Score</p>
      </div>

      <div className="stat-card">
        <h3>{formatScore(bestScore)}</h3>
        <p>Best Score</p>
      </div>
    </div>

    <div className="history-grid">
            {filteredHistory.map((item) => (
              <div key={item._id} className="history-card">
                <div className="card-top">
                  <span className="role-tag">{item.role}</span>
                  <div className={`score-badge ${getScoreClass(item.score)}`}>
  {formatScore(item.score)}
</div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <FiCalendar className="detail-icon" />
                    <span>{new Date(item.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}</span>
                  </div>
                  <div className="detail-item">
                    <FiAward className="detail-icon" />
                    <span>{item.question ? "1 Question Evaluated" : "Mock Session"}</span>
                  </div>
                  {item.question && (
  <p className="question-preview">
    {item.question.length > 90
      ? item.question.substring(0, 90) + "..."
      : item.question}
  </p>
)}
                </div>

                <button
  className="view-details-btn"
  onClick={() => setSelectedInterview(item)}
>
  <span>View Full Feedback</span>
  <FiArrowRight />
</button>
              </div>
            ))}
          </div>
           </>
        )}
        {selectedInterview && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedInterview(null)}
  >
    <div
      className="feedback-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
  <div>
    <h3>{selectedInterview.role}</h3>

    <p className="modal-date">
      {new Date(selectedInterview.createdAt).toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )}
    </p>
  </div>

  <button
    className="close-btn"
    onClick={() => setSelectedInterview(null)}
  >
    ×
  </button>
</div>

      <div className="modal-body">
        <div className="score-circle-wrapper">
  <div className="score-circle">
    <span>{formatScore(selectedInterview.score)}</span>
  </div>

  <h4>Interview Score</h4>
</div>

        <div className="modal-section">
          <h4>Question</h4>
          <p>{selectedInterview.question || "No question available."}</p>
        </div>

        <div className="modal-section">
          <h4>Your Answer</h4>
          <p>{selectedInterview.answer || "No answer available."}</p>
        </div>

        <div className="modal-section">
          <h4>AI Feedback</h4>
          <p>{selectedInterview.feedback || "No feedback available."}</p>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </DashboardLayout>
  );
}