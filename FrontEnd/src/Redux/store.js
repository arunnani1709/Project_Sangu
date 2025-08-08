// src/Redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Components/Login/authSlice";
import patientsReducer from "./patientsSlice"; // <-- import new slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer, // <-- add patients slice
  },
});
