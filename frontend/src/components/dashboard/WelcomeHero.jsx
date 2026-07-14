import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const WelcomeHero = () => {
    const [userName, setUserName] = useState("User");
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [hasInterviews, setHasInterviews] = useState(false);
    const [today, setToday] = useState("");

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

setUserName(storedUser.name || "User");
setUserEmail(storedUser.email || "");
const interviewHistory = JSON.parse(
  localStorage.getItem("interviewHistory") || "[]"
);

setHasInterviews(interviewHistory.length > 0);
setToday(
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
}, []);
  return (
    <section className="welcome-hero">
      <div className="hero-content">
        <span className="hero-badge">
            
  {userEmail || "AI Powered Interview Platform"}
</span>
<p className="hero-date">{today}</p>
        <h1>
          Welcome back,
         <span className="hero-name">
  {" "}{userName} 👋
</span>
        </h1>

        <p>
          Practice AI interviews, analyze your resume,
          improve your interview performance,
          and track your progress—all in one place.
        </p>

       <div className="hero-actions">
  <button
    className="hero-btn"
    onClick={() => navigate("/interview")}
  >
    {hasInterviews ? "Continue Practice" : "Start Mock Interview"}
  </button>

  <button
    className="hero-btn secondary-btn"
    onClick={() => navigate("/profile")}
  >
    My Profile
  </button>
</div>
      </div>

      <div className="hero-image">
        🤖
      </div>
    </section>
  );
};

export default WelcomeHero;