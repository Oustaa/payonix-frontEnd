import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/artisans";

export const getArtisans = createAsyncThunk("get/artisans", async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });

  return response.data;
});

const artisnas = createSlice({
  name: "artisans",
  initialState: {
    status: "idle",
    value: { artisans: [], artisans_compta: [] },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtisans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getArtisans.fulfilled, (state, { payload }) => {
        state.value.artisans = payload;
        state.status = "success";
      })
      .addCase(getArtisans.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
  },
});

export default artisnas.reducer;
