import api from "./api";

// Login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
// Update Logged-in User Profile
export const updateUserProfile = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};