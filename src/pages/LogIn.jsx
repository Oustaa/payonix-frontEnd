import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn as login, isLoggedIn } from "../features/auth-slice";
import { useCookies } from "react-cookie";

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

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;

  const { status, value } = useSelector((state) => state.auth);

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

  useEffect(() => {
    dispatch(isLoggedIn({ token }));
  }, []);

  useEffect(() => {
    if (status === "idle") return navigate("/");
  }, [navigate, status, value]);

  const submitHundler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          u_email: email.value,
          u_password: password.value,
        }
      );

      const { accessToken, username } = response.data;

      if (accessToken) {
        dispatch(login({ accessToken, username }));

        let expires = new Date();
        expires.setTime(expires.getTime() + 43200 * 1000);
        setCookie("access_token", accessToken, {
          path: "/",
          expires,
          secure: true,
        });
        setCookie("user_name", username, {
          path: "/",
          expires,
        });

        // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})

        navigate("/dashboard");
      }
    } catch (error) {
      const responseData = error?.response?.data;
      if (!responseData.email)
        setEmail((prev) => {
          return { ...prev, valid: false };
        });
      else {
        setEmail((prev) => {
          return { ...prev, valid: true };
        });
      }
      if (!responseData.password)
        setPassword((prev) => {
          return { ...prev, valid: false };
        });
      else {
        setPassword((prev) => {
          return { ...prev, valid: true };
        });
      }
    }
  };

  return (
    <StyledLogInContainer>
      <StyledLogIn>
        <StyledLogInHeader>
          <h1>Logo</h1>
          <h2>Log in</h2>
        </StyledLogInHeader>
        <StyledLogInForm onSubmit={submitHundler}>
          <InputGroup className={!email.valid ? "invalid" : ""} inline={false}>
            <label htmlFor="">Username or Email:</label>
            <input
              type="text"
              placeholder="enter your username or your email"
              value={email.value}
              onChange={emailChangeHndler}
            />
            {/* {!email.valid ? <p>email is invalid</p> : null} */}
          </InputGroup>
          <InputGroup
            className={!password.valid ? "invalid" : ""}
            inline={false}
          >
            <label htmlFor="">Password:</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password.value}
              onChange={passwordChangeHndler}
            />
            {/* {!password.valid ? <p>password is invalid</p> : null} */}
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
