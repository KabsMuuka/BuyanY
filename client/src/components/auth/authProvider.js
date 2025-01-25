import axios from "axios";
import { store } from "../../../redux/store/store";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // To include cookies for cross-origin requests
});

// Add Authorization header before each request
api.interceptors.request.use((config) => {
  const state = store.getState(); // Access Redux state
  const token = state.auth?.accessToken; // Get token from auth slice

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        // Refresh the token
        const refreshResponse = await api.get("/refresh-token");

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("newAccessToken", newAccessToken);

        // Update Redux store with the new access token
        store.dispatch({
          type: "auth/updateAccessToken", // Your specific action to update token
          payload: newAccessToken,
        });

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token refresh failed: ",
          refreshError.response?.data || refreshError.message
        );
        return Promise.reject(refreshError); // Reject the request if refresh fails
      }
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default api;
