import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/components/auth/authProvider";
import * as actions from "./types/types";
import { useDispatch, useSelector } from "react-redux";

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
      console.log(response);
      return response.data; // Ensure this is the profile data you want to store
    } catch (error) {
      console.error("Profile Error:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//getting all users
export const fetchUsers = createAsyncThunk(
  actions.FETCH_USERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Fetch image Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logout Action Creator (Sync Action)
export const logout = () => ({
  type: actions.LOGOUT,
});

//saving images
export const uploadImage = createAsyncThunk(
  actions.SAVE_POST,
  async (ImageData, { rejectWithValue }) => {
    try {
      const response = await api.post("/savePost", ImageData);
      return response.data;
    } catch (error) {
      console.error("Image save Error:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//getting posts
export const fetchPosts = createAsyncThunk(
  actions.FETCH_POST,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/fetchPost");
      console.log("imaged fetch", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch image Error:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//getting messages
export const fetchMessages = createAsyncThunk(
  actions.FETCH_MESSAGES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/messages");
      return response.data;
    } catch (error) {
      console.error("Fetch image Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
