import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/artisans`;

const initialState = {
  artisans: { loading: false, error: null, data: [] },
  artisans_compta: { loading: false, error: null, data: [] },
};

export const getArtisans = createAsyncThunk(
  "get/artisans",
  async ({ token }) => {
    const response = await axios.get(BASE_URL, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

export const getArtisansCompta = createAsyncThunk(
  "get/artisans/compta",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/comptas`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const artisnasSlice = createSlice({
  name: "artisans",
  initialState,
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
    deletArtisan: (state, { payload }) => {
      const filtredDeletion = state.artisans.data.filter(
        (artisan) => artisan.a_id !== payload.id
      );
      state.artisans.data = filtredDeletion;
    },
    deletArtisanCompta: (state, { payload }) => {
      const filtredDeletion = state.artisans_compta.data.filter(
        (artisanCompta) => artisanCompta.ac_id !== payload.id
      );
      state.artisans_compta.data = filtredDeletion;
    },
    updateArtisan: (state, { payload }) => {
      const filtredUpdate = state.artisans.data.map((artisan) => {
        if (artisan.a_id === payload.a_id) return payload;
        return artisan;
      });
      state.artisans.data = filtredUpdate;
    },
    updateArtisanCompta: (state, { payload }) => {
      const filtredUpdate = state.artisans_compta.data.map((artisanCompta) => {
        if (artisanCompta.ac_id === payload.ac_id) {
          const a_name = state.artisans.data.find(
            (artisan) => artisan.a_id === payload.ac_artisan_id
          )?.a_name;
          return { ...payload, a_name };
        }
        return artisanCompta;
      });

      state.artisans_compta.data = filtredUpdate;
    },

    resetArtisans: (state) => {
      state.artisans = { loading: false, error: null, data: [] };
      state.artisans_compta = { loading: false, error: null, data: [] };
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

export const {
  addArtisanCompta,
  addArtisan,
  resetArtisans,
  deletArtisan,
  deletArtisanCompta,
  updateArtisan,
  updateArtisanCompta,
} = artisnasSlice.actions;

export default artisnasSlice.reducer;
