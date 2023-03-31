import React from "react";

import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../../features/ui-slice";

import NavBarBtn from "./NavBarBtn";
import { Button } from "../../styles";
import { StyledNavBar } from "../../styles/styled-navBar";

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
