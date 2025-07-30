// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async login logic
export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
  const { username, password } = formData;

  if (username === "admin" && password === "admin123") {
    const user = { role: "admin", name: "Admin" };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  if (password === "doctor123") {
    const user = { role: "doctor", name: username };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  return thunkAPI.rejectWithValue("Invalid credentials");
});

// Restore login from localStorage
export const syncAuthFromStorage = () => (dispatch) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
