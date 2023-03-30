import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MdLogout } from "react-icons/md";
import styled from "styled-components";
import { Button } from "../../styles";
import { useCookies } from "react-cookie";

const StyledBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavBarBtn = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const logOut = () => {
    setCookies("access_token", null);
    setCookies("user_name", null);
    navigate("/log_in");
  };

  return (
    <StyledBtnContainer>
      <span>{cookies.user_name}</span>
      <Button onClick={logOut}>
        <MdLogout />
      </Button>
    </StyledBtnContainer>
  );
};

export default NavBarBtn;
