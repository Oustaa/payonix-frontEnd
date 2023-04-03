import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const StyledLoading = styled.div`
  width: 100%;
  height: calc(80vh);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <PuffLoader color="#46B6E6" loading size={118} />
    </StyledLoading>
  );
};

export default Loading;
