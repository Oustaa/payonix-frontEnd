import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    sidNavOpen: true,
    alertOpen: false,
    alertFor: null,
    alertTitle: "",
  },
  reducers: {
    // side nav
    openSidebar: (state) => {
      state.sidNavOpen = !state.sidNavOpen;
    },
    closeSidebar: (state) => {
      state.sidNavOpen = false;
    },
    // alert
    openAlert: (state, { payload: { name, type, alertTitle } }) => {
      state.alertOpen = true;
      state.alertFor = { name, type };
      state.alertTitle = alertTitle;
    },
    closeAlert: (state) => {
      state.alertOpen = false;
      state.alertFor = null;
    },
  },
});

export const { openSidebar, closeSidebar, openAlert, closeAlert } =
  authSlice.actions;

export default authSlice.reducer;
