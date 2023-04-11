import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/auth`;

export const isLoggedIn = createAsyncThunk(
  "auth/isLoogedIn",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/isLoggedIn`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { status: "loading", value: false, token: null, role: null },
  reducers: {
    logIn: (state, { payload: { accessToken, username, role } }) => {
      state.value = true;
      state.username = username;
      state.token = accessToken;
      state.role = role;
    },
    logOut: (state) => {
      state.value = false;
      state.username = "";
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isLoggedIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        isLoggedIn.fulfilled,
        (state, { payload: { isLoggedIn, username, token, role } }) => {
          state.value = isLoggedIn;
          state.username = username;
          state.status = "idle";
          state.token = token;
          state.role = role;
        }
      )
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
