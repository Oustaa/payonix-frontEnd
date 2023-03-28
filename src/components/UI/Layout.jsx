import React from "react";

import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideNav from "./sidenav/SideNav";
import NavBar from "./NavBar/NavBar";

const StyledBody = styled.div`
  display: flex;
  grid-template-columns: repeat(14, 7.14%);
  grid-template-rows: repeat(auto-fill, 100px);
  // gap: var(--spacing-lg);
`;

const StyledMain = styled.main`
  display: flex;
  gap: var(--spacing-lg);
  width: 100%;
  flex-direction: column;
  padding-inline: var(--spacing-lg);
`;

const Layout = () => {
  return (
    <StyledBody>
      <SideNav />
      <StyledMain>
        <NavBar />
        <Outlet />
      </StyledMain>
    </StyledBody>
  );
};

export default Layout;
