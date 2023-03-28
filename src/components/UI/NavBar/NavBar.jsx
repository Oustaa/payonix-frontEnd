import React from "react";
import styled from "styled-components";

import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import NavBarBtn from "./NavBarBtn";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../../../features/ui-slice";
import { Button } from "../../../styles";

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: ${({ sidNavOpen }) =>
    !sidNavOpen ? "space-between" : "flex-end"};
  width: 100%;
  height: 70px;
  padding-inline: var(--spacing-lg);

  background-color: var(--white);
  // padding: var(--spacing-xl);
  // border-bottom-left-radius: var(--radius-lg);
  // border-top-left-radius: var(--radius-lg);

  box-shadow: var(--boxShadow);
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const { sidNavOpen } = useSelector((state) => state.ui);

  return (
    <StyledNavBar sidNavOpen={sidNavOpen}>
      {!sidNavOpen ? (
        <Button onClick={() => dispatch(openSidebar())}>
          <BsLayoutSidebarInsetReverse />
        </Button>
      ) : null}
      <NavBarBtn />
    </StyledNavBar>
  );
};

export default NavBar;
