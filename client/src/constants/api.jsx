import axios from "axios";

const api = axios.create({
  withCredentials: true, // Important for sending and receiving cookies
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // Set a default base URL
});

export default api;
