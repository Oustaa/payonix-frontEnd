import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

export const getProducts = createAsyncThunk(
  "get/products",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

export const getProductsInventory = createAsyncThunk(
  "get/products_inventory",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/inventory`, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

export const getProductsVariety = createAsyncThunk(
  "get/products_variety",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/variety`, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const productsInventorySlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    value: { inventory: [], products: [], varity: [] },
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.value = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsInventory.fulfilled, (state, { payload }) => {
        state.value.inventory = payload;
        state.status = "success";
      })
      .addCase(getProductsInventory.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
    // getting products
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.value.products = payload;
        state.status = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
    // getting products variety
    builder
      .addCase(getProductsVariety.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsVariety.fulfilled, (state, { payload }) => {
        state.value.varity = payload;
        state.status = "success";
      })
      .addCase(getProductsVariety.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
  },
});

export default productsInventorySlice.reducer;
