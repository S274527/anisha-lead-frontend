import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    createUserSession(state, { payload }) {
      state.user = payload;
    },
  },
});

export const { createUserSession } = authSlice.actions;

export default authSlice.reducer;
