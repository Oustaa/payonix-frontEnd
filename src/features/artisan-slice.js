import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/artisans";

export const getArtisans = createAsyncThunk("get/artisans", async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });

  return response.data;
});

export const getArtisansCompta = createAsyncThunk(
  "get/artisans/compta",
  async () => {
    const response = await axios.get(`${BASE_URL}/comptas`, {
      withCredentials: true,
    });

    return response.data;
  }
);

const artisnasSlice = createSlice({
  name: "artisans",
  initialState: {
    artisans: { loading: false, error: null, data: [] },
    artisans_compta: { loading: false, error: null, data: [] },
  },
  reducers: {
    addArtisan: (state, { payload }) => {
      state.artisans.data.unshift(payload);
    },
    addArtisanCompta: (state, { payload }) => {
      const a_name = state.artisans.data.find(
        (artisan) => artisan.a_id === payload.ac_artisan_id
      ).a_name;
      state.artisans_compta.data.unshift({ ...payload, a_name });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtisans.pending, (state) => {
        state.artisans.error = null;
        state.artisans.loading = true;
      })
      .addCase(getArtisans.fulfilled, (state, { payload }) => {
        state.artisans.data = payload;
        state.artisans.loading = false;
      })
      .addCase(getArtisans.rejected, (state, action) => {
        state.artisans.error = action.error;
        state.artisans.loading = false;
      });
    builder
      .addCase(getArtisansCompta.pending, (state) => {
        state.artisans_compta.error = null;
        state.artisans_compta.loading = true;
      })
      .addCase(getArtisansCompta.fulfilled, (state, { payload }) => {
        state.artisans_compta.data = payload;
        state.artisans_compta.loading = false;
      })
      .addCase(getArtisansCompta.rejected, (state, action) => {
        state.artisans_compta.error = action.error;
        state.artisans_compta.loading = false;
      });
  },
});

export const { addArtisanCompta, addArtisan } = artisnasSlice.actions;

export default artisnasSlice.reducer;
