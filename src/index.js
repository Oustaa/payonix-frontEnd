import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";

import { getArtisans } from "./features/artisan-slice";
store.dispatch(getArtisans());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
