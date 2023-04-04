import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import uiSlice from "../features/ui-slice";
import productsSlice from "../features/products-slice";
import artisanSlice from "../features/artisan-slice";
import materialSlice from "../features/rawMaterial-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    products: productsSlice,
    artisans: artisanSlice,
    materials: materialSlice,
  },
  devTools: true,
});
