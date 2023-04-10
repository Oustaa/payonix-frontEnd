import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/rawMaterials`;

const initialState = {
  base: { loading: false, error: null, data: [] },
  type: { loading: false, error: null, data: [] },
  inventory: { loading: false, error: null, data: [] },
  stock: { loading: false, error: null, data: [] },
};

export const getMaterialsBase = createAsyncThunk(
  "get/rawMaterials/bases",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/bases`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

export const getMaterialsTypes = createAsyncThunk(
  "get/rawMaterials/types",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/types`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

export const getMaterialsInventory = createAsyncThunk(
  "get/rawMaterials/inventory",
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

export const getMaterialsStock = createAsyncThunk(
  "get/rawMaterials/stock",
  async ({ token }) => {
    const response = await axios.get(`${BASE_URL}/stock`, {
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    addBase: (state, { payload }) => {
      state.base.data.unshift(payload);
    },
    addType: (state, { payload }) => {
      const rmb_origin = state.base.data.find(
        (base) => base.rmb_id === payload.rmt_raw_mat_base_type
      ).rmb_name;
      state.type.data.unshift({ ...payload, rmb_origin });
    },
    addInventory: (state, { payload }) => {
      state.inventory.data.unshift(payload);
    },
    addStock: (state, { payload }) => {
      const rms_rm_type = state.type.data.find(
        (type) => type.rmt_id === payload.rms_raw_mat_id
      ).rmt_name;
      state.stock.data.unshift({ ...payload, rms_rm_type });
    },
    updateInventory: (state, { payload }) => {},
    resetMaterials: (state) => {
      state.base = { loading: false, error: null, data: [] };
      state.type = { loading: false, error: null, data: [] };
      state.inventory = { loading: false, error: null, data: [] };
      state.stock = { loading: false, error: null, data: [] };
    },
  },
  extraReducers: (builder) => {
    // getting Naterials base
    builder
      .addCase(getMaterialsBase.pending, (state) => {
        state.base.loading = true;
      })
      .addCase(getMaterialsBase.fulfilled, (state, { payload }) => {
        state.base.data = payload;
        state.base.loading = false;
      })
      .addCase(getMaterialsBase.rejected, (state, { error }) => {
        state.base.error = error;
        state.base.loading = false;
      });
    // geting materials types
    builder
      .addCase(getMaterialsTypes.pending, (state) => {
        state.type.loading = true;
      })
      .addCase(getMaterialsTypes.fulfilled, (state, { payload }) => {
        state.type.data = payload;
        state.type.loading = false;
      })
      .addCase(getMaterialsTypes.rejected, (state, { error }) => {
        state.type.loading = false;
        state.type.error = error;
      });
    // geting products inventory
    builder
      .addCase(getMaterialsInventory.pending, (state) => {
        state.inventory.loading = true;
      })
      .addCase(getMaterialsInventory.fulfilled, (state, { payload }) => {
        state.inventory.data = payload;
        state.inventory.loading = false;
      })
      .addCase(getMaterialsInventory.rejected, (state, { error }) => {
        state.inventory.loading = false;
        state.inventory.error = error;
      });
    // getting products variety
    builder
      .addCase(getMaterialsStock.pending, (state) => {
        state.stock.loading = true;
      })
      .addCase(getMaterialsStock.fulfilled, (state, { payload }) => {
        state.stock.data = payload;
        state.stock.loading = false;
      })
      .addCase(getMaterialsStock.rejected, (state, { error }) => {
        state.stock.error = error;
        state.stock.loading = false;
      });
  },
});

export const {
  addBase,
  addType,
  addInventory,
  addStock,
  updateInventory,
  resetMaterials,
} = materialsSlice.actions;

export default materialsSlice.reducer;
