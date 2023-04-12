import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

export const getUsers = createAsyncThunk("get/users", async ({ token }) => {
  const response = await axios.get(BASE_URL, {
    withCredentials: true,
    headers: {
      authorization: token,
    },
  });

  return response.data;
});

const artisnasSlice = createSlice({
  name: "users",
  initialState: {
    users: { loading: false, error: null, data: [] },
  },
  reducers: {
    addUsers: (state, { payload }) => {
      state.users.data.unshift(payload);
    },
    deletUsers: (state, { payload }) => {
      const filtredDeletion = state.users.data.filter(
        (user) => user.u_id !== payload.id
      );
      state.users.data = filtredDeletion;
    },
    resetUsers: (state) => {
      state.users = { loading: false, error: null, data: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users.error = null;
        state.users.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users.data = payload;
        state.users.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users.error = action.error;
        state.users.loading = false;
      });
  },
});

export const { addUsers, resetUsers, deletUsers } = artisnasSlice.actions;

export default artisnasSlice.reducer;
