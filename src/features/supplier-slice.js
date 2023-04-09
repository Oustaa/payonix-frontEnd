import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/suppliers`;

const initialState = {
  suppliers: { loading: false, error: null, data: [] },
  suppliers_compta: { loading: false, error: null, data: [] },
};

export const getSuppliers = createAsyncThunk("get/suppliers", async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });

  return response.data;
});

export const getSuppliersCompta = createAsyncThunk(
  "get/suppliers/compta",
  async () => {
    const response = await axios.get(`${BASE_URL}/comptas`, {
      withCredentials: true,
    });

    return response.data;
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    addSupplier: (state, { payload }) => {
      state.suppliers.data.unshift(payload);
    },
    addSupplierCompta: (state, { payload }) => {
      const { s_name } = state.suppliers.data.find(
        (supplier) => supplier.s_id === payload.sc_supplier_id
      );
      state.suppliers_compta.data.unshift({ ...payload, s_name });
    },
    resetSuppliers: (state) => {
      state.suppliers = { loading: false, error: null, data: [] };
      state.suppliers_compta = { loading: false, error: null, data: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.suppliers.error = null;
        state.suppliers.loading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, { payload }) => {
        state.suppliers.data = payload;
        state.suppliers.loading = false;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.suppliers.error = action.error;
        state.suppliers.loading = false;
      });
    builder
      .addCase(getSuppliersCompta.pending, (state) => {
        state.suppliers_compta.error = null;
        state.suppliers_compta.loading = true;
      })
      .addCase(getSuppliersCompta.fulfilled, (state, { payload }) => {
        state.suppliers_compta.data = payload;
        state.suppliers_compta.loading = false;
      })
      .addCase(getSuppliersCompta.rejected, (state, action) => {
        state.suppliers_compta.error = action.error;
        state.suppliers_compta.loading = false;
      });
  },
});

export const { addSupplierCompta, addSupplier, resetSuppliers } =
  supplierSlice.actions;

export default supplierSlice.reducer;
