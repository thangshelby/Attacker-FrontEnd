import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // ✅ Dynamic token từ localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // ✅ Clear invalid token và redirect về login
      localStorage.removeItem("token");
      // Clear user state từ store nếu cần
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default api;
