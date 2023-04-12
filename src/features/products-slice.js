import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/products`;

const initialState = {
  // shouled be renamed to category
  products: { loading: false, error: null, data: [] },
  inventory: { loading: false, error: null, data: [] },
  // shouled be renamed to products
  varity: { loading: false, error: null, data: [] },
};

export const getProducts = createAsyncThunk(
  "get/products",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/category`, {
      withCredentials: true,
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
      withCredentials: true,
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
    const response = await axios.get(`${BASE_URL}`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.products.data.unshift(payload);
    },
    addProductInventory: (state, { payload }) => {
      const product = state.varity.data.find(
        (product) => product.p_id === payload.pi_prod_id
      );

      const catigory = state.products.data.find((category) => {
        return category.pc_id === product.p_category;
      });

      const name = product?.p_name;
      const category_name = catigory?.pc_name;

      state.inventory.data.unshift({
        ...payload,
        name,
        catigory: category_name,
      });
    },
    addProductVariety: (state, { payload }) => {
      const p_category = state.products.data.find(
        (category) => (category.pc_id = payload.p_category)
      )?.pc_name;

      state.varity.data.unshift({ ...payload, p_category_name: p_category });
    },
    deletProductsCategory: (state, { payload }) => {
      console.log(payload.id);
      const filtredDeletion = state.products.data.filter(
        (category) => category.pc_id !== payload.id
      );
      state.products.data = filtredDeletion;
    },
    deletProducts: (state, { payload }) => {
      const filtredDeletion = state.varity.data.filter(
        (product) => product.p_id !== payload.id
      );
      state.varity.data = filtredDeletion;
    },
    deletProductsInventory: (state, { payload }) => {
      const filtredDeletion = state.inventory.data.filter((inv) => {
        return inv.pi_id !== payload.id;
      });
      state.inventory.data = filtredDeletion;
    },
    resetProducts: (state) => {
      state.products = { loading: false, error: null, data: [] };
      state.inventory = { loading: false, error: null, data: [] };
      state.varity = { loading: false, error: null, data: [] };
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

export const {
  addProduct,
  addProductInventory,
  addProductVariety,
  resetProducts,
  deletProducts,
  deletProductsCategory,
  deletProductsInventory,
} = productsSlice.actions;

export default productsSlice.reducer;
