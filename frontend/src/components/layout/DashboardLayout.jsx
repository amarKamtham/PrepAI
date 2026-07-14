import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../pages/Dashboard/Dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;