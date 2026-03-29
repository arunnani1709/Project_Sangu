// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000";

// Async login — calls real backend with username + password
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const { username, password } = formData;
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Restore session from localStorage
export const syncAuthFromStorage = createAsyncThunk(
  "auth/syncAuthFromStorage",
  async (_, thunkAPI) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      return {
        user: JSON.parse(user),
        token,
      };
    } else {
      return thunkAPI.rejectWithValue("No auth data in storage");
    }
  }
);

// Initial state
const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  status: "idle",
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(syncAuthFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(syncAuthFromStorage.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
