import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth-slice";

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
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();
  const { username } = useSelector((state) => state.auth);

  return (
    <StyledBtnContainer>
      <span>{username}</span>
      <Button
        onClick={() => {
          dispatch(logOut({ setCookies, navigate }));
        }}
      >
        <MdLogout />
      </Button>
    </StyledBtnContainer>
  );
};

export default NavBarBtn;
