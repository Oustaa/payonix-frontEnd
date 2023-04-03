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
      <h1>logo</h1>
      <Button onClick={() => dispatch(closeSidebar())}>
        <BsLayoutSidebarInset />
      </Button>
    </StyledHeader>
  );
};

export default SideNavHeader;
