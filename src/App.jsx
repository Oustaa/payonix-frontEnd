import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/UI/Layout";
import LogIn from "./pages/LogIn";

import GlobalStyles from "./styles/globalStyles";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/" element={<Layout />}></Route>
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;

// element={<Layout />}
