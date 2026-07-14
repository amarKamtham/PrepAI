import api from "./api";

// Dashboard Statistics
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

// Recent Interview History
export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};
// Performance Chart Data
export const getPerformanceData = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};