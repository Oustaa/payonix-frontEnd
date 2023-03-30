import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import uiSlice from "../features/ui-slice";
import productsInventorySlice from "../features/productsInventory-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    products: productsInventorySlice,
  },
});
