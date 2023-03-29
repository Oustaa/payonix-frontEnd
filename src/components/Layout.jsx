import React from "react";

import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideNav from "./sidenav/SideNav";
import NavBar from "./NavBar/NavBar";

const StyledBody = styled.div`
  display: flex;
  // gap: var(--spacing-lg);
  // max-width: 1600px;
  margin-inline: auto;
`;

const StyledMain = styled.main`
  display: flex;
  gap: var(--spacing-lg);
  width: 100%;
  min-width: 70%;
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
