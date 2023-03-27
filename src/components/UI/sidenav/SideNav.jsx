import React from "react";
import styled from "styled-components";

import SideNavHeader from "./SideNavHeader";
import SideNavLinks from "./SideNavLinks";

const StyledSidNav = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: var(--white);
  padding: var(--spacing-lg);
`;

const SideNav = () => {
  return (
    <StyledSidNav>
      <SideNavHeader />
      <SideNavLinks />
    </StyledSidNav>
  );
};

export default SideNav;
