// src/redux/medicineSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all medicines
export const fetchMedicines = createAsyncThunk(
  "medicines/fetchAll",
  async () => {
    const response = await axios.get("http://localhost:5000/api/medicines");
    // Ensure it's always an array
    return Array.isArray(response.data)
      ? response.data
      : response.data.medicines || [];
  }
);

// Add a new medicine
export const addMedicine = createAsyncThunk(
  "medicines/add",
  async (medicine) => {
    const response = await axios.post(
      "http://localhost:5000/api/medicines",
      medicine
    );
    return response.data;
  }
);

const medicineSlice = createSlice({
  name: "medicines",
  initialState: {
    medicines: [], // always array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.medicines.push(action.payload);
      });
  },
});

export default medicineSlice.reducer;
