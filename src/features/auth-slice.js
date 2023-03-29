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
  initialState: { status: null, value: false, username: "" },
  reducers: {
    logIn: (state, { payload: { accessToken, username, setCookie } }) => {
      state.value = true;
      state.username = username;
      let expires = new Date();
      expires.setTime(expires.getTime() + 43200 * 1000);
      setCookie("access_token", accessToken, {
        path: "/",
        expires,
      });
      // httpOnly: true,
      //   secure: true,
      // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
    },

    logOut: (state, { payload: { setCookies, navigate } }) => {
      console.log("Logging out please wait");
      state.value = true;
      state.username = "";
      setCookies("access_token", null);
      navigate("/log_in");
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
      );
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
