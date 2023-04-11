import React from "react";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../../features/ui-slice";

import { BsLayoutSidebarInset } from "react-icons/bs";
import { Button } from "../../styles/index";
import { StyledHeader } from "../../styles/styled-sideNav";

const SideNavHeader = () => {
  const dispatch = useDispatch();
  return (
    <StyledHeader>
      {/* shouled be replaced with an actual image */}
      <img
        src="https://payonix-stock.onrender.com/api/images/logo-text.png"
        alt="payonix text logo"
      />
      <Button onClick={() => dispatch(closeSidebar())}>
        <BsLayoutSidebarInset />
      </Button>
    </StyledHeader>
  );
};

export default SideNavHeader;
