import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/auth";

export const isLoggedIn = createAsyncThunk(
  "auth/isLoogedIn",
  async ({ token }) => {
    const response = await axios.post(
      `${BASE_URL}/isLoggedIn`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { status: null, value: false },
  reducers: {
    logIn: (state, { payload: { accessToken, username } }) => {
      state.value = true;
      state.username = username;
    },

    logOut: (state, { payload }) => {
      state.value = true;
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isLoggedIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        isLoggedIn.fulfilled,
        (state, { payload: { isLoggedIn, username } }) => {
          console.log("fulfilled with username: ", username);
          state.value = isLoggedIn;
          state.username = username;
          state.status = "idle";
        }
      )
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
