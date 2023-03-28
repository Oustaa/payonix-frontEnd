import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "../utils/isloggedin";

import styled from "styled-components";

const StyledPendingPage = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pending = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    isLoggedIn(cookies.access_token)
      .then((data) => {
        const isLoggedIn = data?.isLoggedIn;
        if (isLoggedIn) {
          return navigate("/dashboard");
        }
      })
      .catch((err) => {
        return navigate("/log_in");
      });
  }, [cookies, navigate]);

  return (
    <StyledPendingPage>We are loading you state wait please</StyledPendingPage>
  );
};

export default Pending;
