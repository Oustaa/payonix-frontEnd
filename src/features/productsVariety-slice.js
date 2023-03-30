import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/products/variety";

export const getProductsInventory = createAsyncThunk(
  "get/products_inventory",
  async ({ token }) => {
    const response = await axios.get(BASE_URL, {
      headers: {
        authorization: token,
      },
    });

    console.log(response);

    return response.data;
  }
);

const productsInventorySlice = createSlice({
  name: "p_inventory",
  initialState: { status: "idle", value: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsInventory.fulfilled, (state, { payload }) => {
        state.value = payload;
        state.status = "success";
      })
      .addCase(getProductsInventory.rejected, (state, action) => {
        state.error = action.error;
        state.status = "error";
      });
  },
});

export default productsInventorySlice.reducer;
