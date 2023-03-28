import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./pages/LogIn";
import Pending from "./pages/Pending";
import ProtectedRoutes from "./components/ProtectedRoutes";

import GlobalStyles from "./styles/globalStyles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pending />} />
        <Route path="/log_in" element={<LogIn />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
};
export default App;
