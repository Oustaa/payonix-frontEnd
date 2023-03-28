import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    sidNavOpen: true,
  },
  reducers: {
    openSidebar: (state) => {
      state.sidNavOpen = true;
    },
    closeSidebar: (state) => {
      state.sidNavOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = authSlice.actions;

export default authSlice.reducer;
