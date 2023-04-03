import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/artisans";

export const getArtisans = createAsyncThunk("get/artisans", async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });
  console.log(response.data);
  return response.data;
});

export const postArtisans = createAsyncThunk(
  "post/artisans",
  async ({ data }) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
    const responsData = await response.json();
    console.log(response);
    return responsData;
  }
);

export const getArtisansCompta = createAsyncThunk(
  "get/artisans/comptas",
  async () => {
    const response = await axios.get(`${BASE_URL}/comptas`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const postArtisansCompta = createAsyncThunk(
  "post/artisans/comptas",
  async ({ data }) => {
    console.log(data);
    const response = await axios.post(
      `${BASE_URL}/comptas`,
      { ...data },
      {
        withCredentials: true,
      }
    );

    return response.data;
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
        state.artisans.data.unshift(payload);
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
        state.artisans_compta.data.unshift(payload);
        state.artisans_compta.loading = false;
        state.artisans_compta.status = "success";
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
