import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/products/inventory";

export const getProductsInventory = createAsyncThunk(
  "get/products_inventory",
  async ({ token }) => {
    const response = await axios.get(BASE_URL, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const productsInventorySlice = createSlice({
  name: "p_inventory",
  initialState: { status: null, value: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsInventory.fulfilled, (state, { payload }) => {
        state.value = payload;
        state.status = "idle";
      })
      .addCase(getProductsInventory.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
  },
});

export default productsInventorySlice.reducer;
