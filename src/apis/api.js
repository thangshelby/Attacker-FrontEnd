import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
