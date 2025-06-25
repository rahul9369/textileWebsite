// src/features/plan/planSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch purchased plan from backend
export const fetchPurchasedPlan = createAsyncThunk(
  "plan/fetchPurchasedPlan",
  async (_, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const managerId = user?.id;

      const res = await fetch(
        `https://inventorymanagement-backend-dev.onrender.com/api/managers/wallet/${managerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch plan");
      }

      return data; // Adjust according to your API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  selectedPlan: null,
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;

      // Optional: Save to localStorage
      localStorage.setItem("plan", JSON.stringify(action.payload));
    },
    clearPlan: (state) => {
      state.selectedPlan = null;
      state.error = null;
      localStorage.removeItem("plan");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasedPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlan = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPurchasedPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch plan.";
      });
  },
});

export const { setSelectedPlan, clearPlan } = planSlice.actions;
export default planSlice.reducer;
