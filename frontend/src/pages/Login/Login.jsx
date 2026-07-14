import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import hero from "../../assets/hero.png";

import { loginUser } from "../../services/authService";
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const data = await loginUser(formData);

    // Save Token
    localStorage.setItem("token", data.token);

    // Save User
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful 🎉");

    navigate("/dashboard");
  } catch (err) {
  console.log("ERROR:", err);

  console.log("Response:", err.response);

  console.log("Data:", err.response?.data);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Login Failed"
  );
} finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}

        <div className="login-left">
          <img src={hero} alt="PrepAI" />

          <h2>PrepAI</h2>

          <p>
            Prepare smarter with AI-powered interviews, resume analysis,
            performance tracking and personalized feedback.
          </p>

          <div className="login-features">
            <span>✓ AI Mock Interviews</span>
            <span>✓ Resume ATS Analysis</span>
            <span>✓ AI Feedback & Score</span>
            <span>✓ Interview History</span>
          </div>
        </div>

        {/* Right Side */}

        <div className="login-right">
          <div className="login-card">
            <h1>Welcome Back 👋</h1>

            <p>Login to continue your interview preparation.</p>
            {error && (
  <div className="error-message">
    {error}
  </div>
)}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
<button
  type="submit"
  className="login-btn-submit"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}

  {!loading && <FaArrowRight />}
</button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <p className="register-link">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}