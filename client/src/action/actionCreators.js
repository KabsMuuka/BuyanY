import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../components/auth/authProvider";
import * as actions from "./types/types";

// Register Async Action
export const register = createAsyncThunk(
  actions.REGISTER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", data);
      return response.data; // Ensure this contains the expected data
    } catch (error) {
      // Log the error for debugging
      console.error("Register Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login Async Action
export const login = createAsyncThunk(
  actions.LOGIN,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      console.log("Login Response:", response); // Log the response for debugging
      return response.data.token; // Ensure this contains the token (e.g., { token: 'jwt_token' })
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Profile Async Action
export const profile = createAsyncThunk(
  actions.PROFILE,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/me");
      return response.data; // Ensure this is the profile data you want to store
    } catch (error) {
      console.error("Profile Error:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logout Action Creator (Sync Action)
export const logout = () => ({
  type: actions.LOGOUT,
});
