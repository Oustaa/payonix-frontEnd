import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import LogIn from "./pages/LogIn";
import Alert from "./components/Alert";
import ProtectedRoutes from "./components/ProtectedRoutes";

import GlobalStyles from "./styles/globalStyles";

const App = () => {
  const { alertOpen } = useSelector((state) => state.ui);

  return (
    <>
      {/* <img
        src="http://localhost:8000/images/1679658285851-20210317_212114.jpg"
        alt="sd"
      /> */}
      {alertOpen ? <Alert /> : null}
      <Router>
        <Routes>
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;
