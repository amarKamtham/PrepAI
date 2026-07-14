import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { updateUserProfile } from "../../services/authService";
import { FiCheckCircle } from "react-icons/fi";
import "./Profile.css";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Simulate pulling active session identity from standard localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFullName(parsed.fullName || parsed.name || "");
      setEmail(parsed.email || "");
    }
  }, []);

  // Compute initials dynamically for the placeholder avatar icon
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      return setStatusMessage({ type: "error", text: "All profile fields are required." });
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
     const response = await updateUserProfile({
  name: fullName,
  email,
});
      
      // Update local storage session values so header/navbar updates sync globally
      const existingSession = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
  "user",
  JSON.stringify({
    ...existingSession,
    name: fullName,
    email,
  })
);
      
      setStatusMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", text: error.message || "Failed to update profile details." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h2>My Profile</h2>
          <p>Manage your account information and preferences.</p>
        </div>

        <div className="profile-layout-grid">
          {/* Left Summary Card */}
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">{getInitials(fullName)}</div>
            </div>
            <div className="profile-info">
              <h3>{fullName || "Loading..."}</h3>
              <p>{email || "loading@example.com"}</p>
            </div>
          </div>

          {/* Right Detailed Update Form Block */}
          <div className="profile-form-container">
            <h3>Account Information</h3>
            
            {statusMessage.text && (
              <div className={`status-banner ${statusMessage.type}`}>
                {statusMessage.type === "success" && <FiCheckCircle />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
  <label>Full Name</label>
  <div className="input-with-icon">
    <input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      disabled={loading}
      placeholder="Enter full name"
    />
  </div>
</div>

              <div className="form-group">
  <label>Email Address</label>
  <div className="input-with-icon">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={loading}
      placeholder="Enter email address"
    />
  </div>
</div>

              <button type="submit" className="save-profile-btn" disabled={loading}>
                {loading ? "Saving Details..." : "Save Profile Details"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}