import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import uiSlice from "../features/ui-slice";
import productsSlice from "../features/products-slice";
import artisanSlice from "../features/artisan-slice";
import supplierSlice from "../features/supplier-slice";
import materialSlice from "../features/rawMaterial-slice";
import usersSlice from "../features/user-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    products: productsSlice,
    artisans: artisanSlice,
    suppliers: supplierSlice,
    materials: materialSlice,
    users: usersSlice,
  },
  devTools: process.env.REACT_APP_ENV !== "production",
});
