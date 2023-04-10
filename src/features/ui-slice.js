import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    // side nave
    sidNavOpen: true,
    // alert
    alertOpen: false,
    alertFor: null,
    alertTitle: "",
    // right click menu
    rightClickMenuOpen: false,
    cordinates: { x: null, y: null },
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
    // right click alert
    openRightClickAlert: (state, { payload }) => {
      state.rightClickMenuOpen = true;
      state.cordinates = payload;
    },
    closeRightClickAlert: (state) => {
      state.rightClickMenuOpen = false;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  openAlert,
  closeAlert,
  openRightClickAlert,
  closeRightClickAlert,
} = authSlice.actions;

export default authSlice.reducer;
