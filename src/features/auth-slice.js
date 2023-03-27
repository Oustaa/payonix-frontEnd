import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { value: false, token: null },
  reducers: {
    logIn: (state, { payload: { accessToken } }) => {
      state.value = true;
      state.token = accessToken;
    },

    logOut: (state) => {
      state = { value: false, token: null };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
