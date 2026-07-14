import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiHelpCircle,
  FiAward,
} from "react-icons/fi";

const StatsCards = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState
  ({
    
    totalInterviews: 0,
    totalResumeAnalyses: 0,
    totalQuestionsGenerated: 0,
    averageInterviewScore: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

const fetchStats = async () => {
  try {
    const data = await getDashboardStats();
    setStats(data.stats);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return (
    <div className="stats-grid">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="stat-card skeleton-card">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="stats-grid">

      <div
  className="stat-card"
  onClick={() => navigate("/interview-history")}
>
  <FiBarChart2 className="stat-icon" />
  <h2>{stats.totalInterviews}</h2>
  <p>Total Interviews</p>
</div>

      <div
  className="stat-card"
  onClick={() => navigate("/resume")}
>
  <FiFileText className="stat-icon" />
  <h2>{stats.totalResumeAnalyses}</h2>
  <p>Resume Analyses</p>
</div>

     <div
  className="stat-card"
  onClick={() => navigate("/questions")}
>
  <FiHelpCircle className="stat-icon" />
  <h2>{stats.totalQuestionsGenerated}</h2>
  <p>Questions Generated</p>
</div>

      <div
  className="stat-card stat-card-highlight"
  onClick={() => navigate("/interview-history")}
>
  <FiAward className="stat-icon" />
  <h2>{Math.round(stats.averageInterviewScore * 10)}%</h2>
  <p>Average Score</p>
</div>

    </div>
  );
};

export default StatsCards;