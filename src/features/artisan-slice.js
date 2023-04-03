import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/artisans";

export const getArtisans = createAsyncThunk("get/artisans", async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const postArtisans = createAsyncThunk(
  "post/artisans",
  async ({ data }) => {
    const response = await axios.post(BASE_URL, data, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  }
);

export const getArtisansCompta = createAsyncThunk(
  "get/artisans/comptas",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comptas`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const postArtisansCompta = createAsyncThunk(
  "post/artisans/comptas",
  async ({ data }) => {
    try {
      const response = await axios.post(`${BASE_URL}/comptas`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const artisnas = createSlice({
  name: "artisans",
  initialState: {
    artisans: {
      data: [],
      error: null,
      status: "idle",
      loading: false,
      type: "",
    },
    artisans_compta: {
      data: [],
      error: null,
      status: "idle",
      loading: false,
      type: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtisans.pending, (state) => {
        state.artisans.loading = true;
        state.artisans.status = "loading";
        state.artisans.type = "get";
        state.artisans.error = null;
      })
      .addCase(getArtisans.fulfilled, (state, { payload }) => {
        state.artisans.data = payload;
        state.artisans.status = "success";
        state.artisans.loading = false;
        state.artisans.type = "";
      })
      .addCase(getArtisans.rejected, (state, action) => {
        state.artisans.error = action.error;
        state.artisans.status = "error";
        state.artisans.loading = false;
        state.artisans.type = "";
      });
    builder
      .addCase(getArtisansCompta.pending, (state) => {
        state.artisans_compta.loading = true;
        state.artisans_compta.status = "loading";
        state.artisans_compta.type = "get";
        state.artisans_compta.error = null;
      })
      .addCase(getArtisansCompta.fulfilled, (state, { payload }) => {
        state.artisans_compta.data = payload;
        state.artisans_compta.loading = false;
        state.artisans_compta.status = "success";
        state.artisans_compta.type = "";
      })
      .addCase(getArtisansCompta.rejected, (state, action) => {
        state.artisans_compta.error = action.error;
        state.artisans_compta.loading = false;
        state.artisans_compta.status = "error";
        state.artisans_compta.type = "";
      });
    builder
      .addCase(postArtisans.pending, (state) => {
        state.artisans.loading = true;
        state.artisans.status = "loading";
        state.artisans.type = "post";
        state.artisans.error = null;
      })
      .addCase(postArtisans.fulfilled, (state, { payload }) => {
        state.artisans.data.unshift(payload.body);
        state.artisans.loading = false;
        state.artisans.status = "success";
        state.artisans.type = "";
      })
      .addCase(postArtisans.rejected, (state, { error }) => {
        state.artisans.error = error;
        state.artisans.loading = false;
        state.artisans.status = "error";
        state.artisans.type = "";
        console.log(error);
      });
    builder
      .addCase(postArtisansCompta.pending, (state) => {
        state.artisans_compta.loading = true;
        state.artisans_compta.status = "loading";
        state.artisans_compta.type = "post";
        state.artisans_compta.error = null;
      })
      .addCase(postArtisansCompta.fulfilled, (state, { payload }) => {
        state.artisans_compta.data.unshift(payload.data);
        state.artisans_compta.status = "success";
        state.artisans_compta.loading = false;
        state.artisans_compta.type = "";
      })
      .addCase(postArtisansCompta.rejected, (state, { error }) => {
        state.artisans_compta.error = error;
        state.artisans_compta.loading = false;
        state.artisans_compta.status = "error";
        state.artisans_compta.type = "";
      });
  },
});

export default artisnas.reducer;
