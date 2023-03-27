import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
