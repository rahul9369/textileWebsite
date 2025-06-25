import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complexity: 3,
  numImages: 4,
};

const textileDesignSlice = createSlice({
  name: "textileDesign",
  initialState,
  reducers: {
    setComplexity: (state, action) => {
      state.complexity = action.payload;
    },
    setNumImages: (state, action) => {
      state.numImages = action.payload;
    },
    setAllParameters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetTextileDesign: () => initialState,
  },
});

export const {
  setComplexity,
  setNumImages,
  setAllParameters,
  resetTextileDesign,
} = textileDesignSlice.actions;

export default textileDesignSlice.reducer;
