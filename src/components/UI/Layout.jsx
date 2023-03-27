import React from "react";

import { Outlet } from "react-router-dom";

import SideNav from "./sidenav/SideNav";

const Layout = () => {
  return (
    <>
      <SideNav />
      <Outlet />
    </>
  );
};

export default Layout;
