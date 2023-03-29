import React from "react";
import styled from "styled-components";

import { BsLayoutSidebarInset } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../../features/ui-slice";

import { Button } from "../../styles/index";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-blue-800);
  height: 70px;

  h1 {
    font-weight: 700;
  }
`;

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
