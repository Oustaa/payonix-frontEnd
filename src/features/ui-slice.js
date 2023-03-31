import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    sidNavOpen: true,
    alertOpen: false,
    alertComponent: () => {},
  },
  reducers: {
    openSidebar: (state) => {
      state.sidNavOpen = !state.sidNavOpen;
    },
    closeSidebar: (state) => {
      state.sidNavOpen = false;
    },
    openAlert: (state, { payload: { formFunction } }) => {
      state.alertOpen = true;
      state.alertComponent = formFunction;
    },
    closeAlert: (state) => {
      state.alertOpen = false;
      state.alertComponent = null;
    },
  },
});

export const { openSidebar, closeSidebar, openAlert, closeAlert } =
  authSlice.actions;

export default authSlice.reducer;
