import React from "react";
import styled from "styled-components";

import { BsCapsule } from "react-icons/bs";

import { Button } from "../../../styles/index";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-blue-800);

  h1 {
    font-weight: 700;
  }
`;

const SideNavHeader = () => {
  return (
    <StyledHeader>
      {/* shouled be replaced with an actual image */}
      <h1>logo</h1>
      <Button>
        <BsCapsule />
      </Button>
    </StyledHeader>
  );
};

export default SideNavHeader;
