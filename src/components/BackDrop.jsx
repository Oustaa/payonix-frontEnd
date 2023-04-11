import React from "react";
import { StyledBackDrop } from "../styles";
const BackDrop = ({ clickHandler, dark }) => {
  return (
    <StyledBackDrop
      dark={dark}
      onClick={clickHandler}
      onContextMenu={clickHandler}
    />
  );
};

export default BackDrop;
