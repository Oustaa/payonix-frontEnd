import React from "react";

import styled from "styled-components";
import { InputGroup, Button } from "../styles";

const StyledLogInContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogIn = styled.div`
  padding: var(--spacing-xxl) var(--spacing-lg);
  width: calc(100% - var(--spacing-lg));
  max-width: 500px;
  background-color: var(--white);
  // height: 300px;
  border-radius: var(--radius-lg);
`;

const StyledLogInHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    color: var(--primary-blue-800);
  }
  h2 {
    color: var(--primary-cyan-800);
  }
`;

const StyledLogInForm = styled.form`
  margin-block-start: var(--spacing-xl);
`;

const LogIn = () => {
  return (
    <StyledLogInContainer>
      <StyledLogIn>
        <StyledLogInHeader>
          <h1>Logo</h1>
          <h2>Log in</h2>
        </StyledLogInHeader>
        <StyledLogInForm>
          <InputGroup inline={false}>
            <label htmlFor="">Username or Email:</label>
            <input
              type="text"
              placeholder="enter your username or your email"
            />
          </InputGroup>
          <InputGroup inline={false}>
            <label htmlFor="">Password:</label>
            <input type="text" placeholder="enter your password" />
          </InputGroup>
          <Button bgColor={"var(--primary-cyan-800)"} color={"var(--white)"}>
            Log in
          </Button>
        </StyledLogInForm>
      </StyledLogIn>
    </StyledLogInContainer>
  );
};

export default LogIn;
