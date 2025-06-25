import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  designType: "standalone",
  complexity: 3,
  numImages: 4,
  shade: "",
};

const textileSlice = createSlice({
  name: "textile",
  initialState,
  reducers: {
    setTextileParameters: (state, action) => {
      const { designType, complexity, numImages, shade } = action.payload;
      state.designType = designType;
      state.complexity = complexity;
      state.numImages = numImages;
      state.shade = shade;
    },
  },
});

export const { setTextileParameters } = textileSlice.actions;
export default textileSlice.reducer;
