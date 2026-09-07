import axios from "axios";

// Create one Axios instance for our backend API.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach the JWT token to requests.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;