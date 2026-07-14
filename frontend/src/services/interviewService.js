import api from "./api";

export const generateQuestions = async (data) => {
  const response = await api.post("/ai/questions", data);
  return response.data;
};

export const evaluateAnswer = async (data) => {
  const response = await api.post("/interview/evaluate", data);
  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};