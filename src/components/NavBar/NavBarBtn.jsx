import React from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { MdLogout } from "react-icons/md";

import { Button } from "../../styles";
import { StyledBtnContainer } from "../../styles/styled-navBar";

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
