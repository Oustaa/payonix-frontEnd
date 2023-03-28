import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { value: false, token: null, username: "" },
  reducers: {
    logIn: (state, { payload: { accessToken, username } }) => {
      state.value = true;
      state.token = accessToken;
      state.username = username;
    },

    logOut: (state) => {
      state.value = true;
      state.token = null;
      state.username = "";
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
