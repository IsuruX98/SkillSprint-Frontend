import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9191/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Bearer token to each request
instance.interceptors.request.use(
  (config) => {
    // Get the JWT token from local storage
    const token = localStorage.getItem("jwt");
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
