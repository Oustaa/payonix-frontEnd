import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import uiSlice from "../features/ui-slice";
import productsInventorySlice from "../features/productsInventory-slice";
import artisanSlice from "../features/artisan-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    products: productsInventorySlice,
    artisans: artisanSlice,
  },
  devTools: true,
});
