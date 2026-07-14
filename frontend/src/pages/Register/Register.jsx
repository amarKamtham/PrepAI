
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import hero from "../../assets/hero.png";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validation
  if (!formData.name.trim()) {
    setError("Full Name is required.");
    return;
  }

  if (!formData.email.trim()) {
    setError("Email is required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (!formData.confirmPassword) {
    setError("Please confirm your password.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

   setSuccess("Registration successful! Redirecting to login...");

setTimeout(() => {
  navigate("/login");
}, 1500);
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <img src={hero} alt="PrepAI" />
          <h2>PrepAI</h2>
          <p>Create your account and start preparing for interviews with AI.</p>
        </div>

        <div className="register-right">
          <div className="register-card">
            <h1>Create Account 🚀</h1>
            <p>Join PrepAI today.</p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="input-group">
                <FaLock />
                <input
                 type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
  className="toggle-password"
  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
>
  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
</span>
              </div>

             <button
  type="submit"
  className="register-btn"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Register"}

  {!loading && <FaArrowRight />}
</button>

            </form>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
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
