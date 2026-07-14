import DashboardLayout from "../../components/layout/DashboardLayout";

import WelcomeHero from "../../components/dashboard/WelcomeHero";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import PerformanceChart from "../../components/dashboard/PerformanceChart";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <WelcomeHero />

      <StatsCards />

      <QuickActions />

      <div className="dashboard-grid">
        <RecentActivity />
        <PerformanceChart />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;