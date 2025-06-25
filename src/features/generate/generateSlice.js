// src/redux/slices/generateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
  resultImages: [],
};

const generateSlice = createSlice({
  name: "generate",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setResultImages: (state, action) => {
      state.resultImages = action.payload;
    },
    clearGenerateData: (state) => {
      state.prompt = "";
      state.resultImages = [];
    },
  },
});

export const { setPrompt, setResultImages, clearGenerateData } =
  generateSlice.actions;
export default generateSlice.reducer;
