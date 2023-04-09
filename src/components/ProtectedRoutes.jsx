import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../features/auth-slice";
import Layout from "./Layout";
import { useCookies } from "react-cookie";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const isAuth = useSelector((state) => state.auth.value);

  useEffect(() => {
    dispatch(isLoggedIn({ token: cookies.access_token }));
  }, [cookies.access_token]);

  return isAuth ? (
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
