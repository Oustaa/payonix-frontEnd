import React from "react";
import { StyledErroPage } from "../styles";

const Error = ({ message }) => {
  return (
    <StyledErroPage>
      <img src="./images/server_down.svg" alt="server Down" />
      <h1>{message || "Internal Server Error"}</h1>
    </StyledErroPage>
  );
};

export default Error;
