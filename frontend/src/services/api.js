import axios from "axios";


// ======================================================
// AXIOS INSTANCE
// ======================================================

// Create one Axios instance for our backend API.
// This prevents us from repeating the backend URL
// throughout the application.

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;