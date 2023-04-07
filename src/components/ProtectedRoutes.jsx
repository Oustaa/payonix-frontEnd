import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Layout from "./Layout";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.value);

  return isLoggedIn ? (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to="/log_in" />
  );
};

export default ProtectedRoutes;
