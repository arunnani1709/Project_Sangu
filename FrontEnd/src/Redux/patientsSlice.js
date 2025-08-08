// src/Redux/patientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const res = await axios.get("http://localhost:5000/api/patients"); // adjust URL if needed
    return res.data; // Expecting array of patients
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = Array.isArray(action.payload) ? action.payload : []; // ✅ safe set
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default patientsSlice.reducer;
