import { useEffect, useState } from "react";
import { getInterviewHistory } from "../../services/dashboardService";
import "./dashboard.css";

const RecentActivity = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getInterviewHistory();

setHistory((response.history || []).slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recent-card">
      <h2>Recent Interviews</h2>

      {history.length === 0 ? (
       <div className="empty-state">
  <h3>No interviews yet</h3>
  <p>Start your first AI mock interview to track your performance.</p>
</div>
      ) : (
        history.map((item) => (
          <div className="history-item" key={item._id}>
            <div>
              <h4>{item.role}</h4>
             <div className="history-meta">
  <small>
    {new Date(item.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </small>

  <small>
    Score: {item.score * 10}%
  </small>
</div>
            </div>

           <span className="history-score">
  {Math.round(item.score * 10)}%
</span>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentActivity;