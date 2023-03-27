import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn as login } from "../features/auth-slice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.value);

  const [email, setEmail] = useState({ value: "", valid: true });
  const [password, setPassword] = useState({ value: "", valid: true });

  const emailChangeHndler = (e) => {
    setEmail((prev) => {
      return { ...prev, value: e.target.value };
    });
  };
  const passwordChangeHndler = (e) => {
    setPassword((prev) => {
      return { ...prev, value: e.target.value };
    });
  };

  const submitHundler = async (e) => {
    e.preventDefault();
    console.log({
      u_email: email.value,
      u_password: password.value,
    });
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        u_email: email.value,
        u_password: password.value,
      });

      const { accessToken } = response.data;

      if (accessToken) {
        dispatch(login({ accessToken }));
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      const responseData = error.response;
    }
  };

  if (isLoggedin) return navigate("/");

  return (
    <StyledLogInContainer>
      <StyledLogIn>
        <StyledLogInHeader>
          <h1>Logo</h1>
          <h2>Log in</h2>
        </StyledLogInHeader>
        <StyledLogInForm onSubmit={submitHundler}>
          <InputGroup inline={false}>
            <label htmlFor="">Username or Email:</label>
            <input
              type="text"
              placeholder="enter your username or your email"
              value={email.value}
              onChange={emailChangeHndler}
            />
          </InputGroup>
          <InputGroup inline={false}>
            <label htmlFor="">Password:</label>
            <input
              type="text"
              placeholder="enter your password"
              value={password.value}
              onChange={passwordChangeHndler}
            />
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
