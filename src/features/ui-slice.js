import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    // side nave
    sidNavOpen: true,
    // alert
    alertOpen: false,
    alertforName: null,
    alertforType: null,
    alertTitle: "",
    // right click menu
    rightClickMenuOpen: false,
    cordinates: { x: null, y: null },
    // related to deleting an item "shouldn't be here but it s ok as long as it works"
    id: null,
    endPoint: null,
    deletable: false,
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
      state.alertforName = name;
      state.alertfortype = type;
      state.alertTitle = alertTitle;
    },
    closeAlert: (state) => {
      state.alertOpen = false;
      state.alertFor = null;
    },
    // right click alert
    openRightClickAlert: (state, { payload }) => {
      state.rightClickMenuOpen = true;
      state.cordinates = payload.cordinates;
      state.id = payload.id;
      state.endPoint = payload.endPoint;
      state.deletable = payload.deletable;
      state.alertforName = payload.alertforName;
    },
    closeRightClickAlert: (state) => {
      state.rightClickMenuOpen = false;
      state.deletable = false;
      state.alertforName = false;
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
