import React from "react";
import { useSelector } from "react-redux";

import SideNavHeader from "./SideNavHeader";
import SideNavLinks from "./SideNavLinks";
import { StyledSidNav } from "../../styles/styled-sideNav";

const SideNav = () => {
  const sideNavOpen = useSelector((state) => state.ui.sidNavOpen);

  return (
    <StyledSidNav open={sideNavOpen}>
      <SideNavHeader />
      <SideNavLinks />
    </StyledSidNav>
  );
};

export default SideNav;
