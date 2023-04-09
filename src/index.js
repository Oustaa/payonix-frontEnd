import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";

import { isLoggedIn } from "./features/auth-slice";
store.dispatch(isLoggedIn());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);
