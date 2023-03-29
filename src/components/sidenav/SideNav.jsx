import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideNavHeader from "./SideNavHeader";
import SideNavLinks from "./SideNavLinks";

const StyledSidNav = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: var(--white);
  padding-inline: var(--spacing-lg);

  box-shadow: var(--boxShadow);

  transition: transform 200ms ease-in;
  ${({ open }) => {
    if (!open) {
      return `
              position: absolute;
              transform: translate(-100%)
            `;
    }
    return `
      position: unset;
      transform: unset;
    `;
  }};

  @media (max-width: 900px) {
    position: absolute;
    transform: translateX(-100%);
  }
`;

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
