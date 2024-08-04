import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    showLoader(state, { payload }) {
      state.showLoader = true;
    },
    hideLoader(state, { payload }) {
      state.showLoader = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
