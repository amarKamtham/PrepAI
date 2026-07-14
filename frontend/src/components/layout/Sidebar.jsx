import {
  FaThLarge,
  FaFileAlt,
  FaRobot,
  FaQuestionCircle,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user session
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">PrepAI</h2>

        <ul className="menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaThLarge />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/resume"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaFileAlt />
            <span>Resume Analyzer</span>
          </NavLink>

          <NavLink
            to="/interview"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaRobot />
            <span>Mock Interview</span>
          </NavLink>

          <NavLink
            to="/questions"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaQuestionCircle />
            <span>Question Generator</span>
          </NavLink>

          <NavLink
            to="/interview-history"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaHistory />
            <span>Interview History</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </ul>
      </div>

      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;