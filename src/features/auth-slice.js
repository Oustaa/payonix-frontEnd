import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/auth`;

export const isLoggedIn = createAsyncThunk("auth/isLoogedIn", async () => {
  const response = await axios.get(`${BASE_URL}/isLoggedIn`, {
    withCredentials: true,
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { status: "loading", value: false },
  reducers: {
    logIn: (state, { payload: { accessToken, username } }) => {
      state.value = true;
      state.username = username;
    },

    logOut: (state) => {
      state.value = false;
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
