import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

export const getProducts = createAsyncThunk("get/products", async () => {
  const response = await axios.get(`${BASE_URL}`, {
    withCredentials: true,
  });

  return response.data;
});

export const getProductsInventory = createAsyncThunk(
  "get/products_inventory",
  async () => {
    const response = await axios.get(`${BASE_URL}/inventory`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const getProductsVariety = createAsyncThunk(
  "get/products_variety",
  async () => {
    const response = await axios.get(`${BASE_URL}/variety`, {
      withCredentials: true,
    });

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: { loading: false, error: null, data: [] },
    inventory: { loading: false, error: null, data: [] },
    varity: { loading: false, error: null, data: [] },
  },
  reducers: {
    addProduct: (state, { payload }) => {
      state.products.data.unshift(payload);
    },
    addProductInventory: (state, { payload }) => {
      state.inventory.data.unshift(payload);
    },
    addProductVariety: (state, { payload }) => {
      state.varity.data.unshift(payload);
    },
  },
  extraReducers: (builder) => {
    // getting products
    builder
      .addCase(getProducts.pending, (state) => {
        state.products.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products.data = payload;
        state.products.loading = false;
      })
      .addCase(getProducts.rejected, (state, { error }) => {
        state.products.error = error;
        state.products.loading = false;
      });
    // geting products inventory
    builder
      .addCase(getProductsInventory.pending, (state) => {
        state.inventory.loading = true;
      })
      .addCase(getProductsInventory.fulfilled, (state, { payload }) => {
        state.inventory.data = payload;
        state.inventory.loading = false;
      })
      .addCase(getProductsInventory.rejected, (state, { error }) => {
        state.inventory.loading = false;
        state.inventory.error = error;
      });
    // getting products variety
    builder
      .addCase(getProductsVariety.pending, (state, action) => {
        state.varity.loading = true;
      })
      .addCase(getProductsVariety.fulfilled, (state, { payload }) => {
        state.varity.data = payload;
        state.varity.loading = false;
      })
      .addCase(getProductsVariety.rejected, (state, { error }) => {
        state.varity.error = error;
        state.varity.loading = false;
      });
  },
});

export const { addProduct, addProductInventory, addProductVariety } =
  productsSlice.actions;

export default productsSlice.reducer;
