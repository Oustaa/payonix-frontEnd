import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { isLoggedIn } from "../utils/isloggedin";
import { isLoggedIn } from "../features/auth-slice";

import styled from "styled-components";

const StyledPendingPage = styled.div`
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pending = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, value } = useSelector((state) => state.auth);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;

  useEffect(() => {
    if (!token) return navigate("/log_in");
    else {
      dispatch(isLoggedIn({ token }));
      if (value) return navigate("/dashboard");
      else return navigate("/log_in");
    }
  }, [token, value, dispatch, navigate]);

  return (
    <StyledPendingPage>We are loading you state wait please</StyledPendingPage>
  );
};

export default Pending;
