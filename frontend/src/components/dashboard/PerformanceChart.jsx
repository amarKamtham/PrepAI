import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getPerformanceData } from "../../services/dashboardService";
import "./dashboard.css";

const PerformanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
    const response = await getPerformanceData();

const history = response.history || [];

const chartData = history
  .filter((item) => typeof item.score === "number")
  .slice(0, 7)
  .reverse()
  .map((item, index) => ({
    name: `A${index + 1}`,
    score: Math.round(item.score * 10),
  }));
      setData(chartData);
    } catch (error) {
      console.error(error);
    }
  };
if (data.length === 0) {
  return (
    <div className="chart-card">
      <h2>Performance Overview</h2>

      <div className="empty-state">
        <h3>No performance data yet</h3>
        <p>
          Complete your first mock interview to see your progress here.
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="chart-card">
      <h2>Performance Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="name" />

          <YAxis
  domain={[0, 100]}
  ticks={[0, 20, 40, 60, 80, 100]}
/>

         <Tooltip
  formatter={(value) => [`${value}%`, "Score"]}
/>

          <Line
 type="natural"
  dataKey="score"
  stroke="#6366f1"
  strokeWidth={3}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;