import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../../../features/auth-slice";

import { MdLogout } from "react-icons/md";
import styled from "styled-components";
import { Button } from "../../../styles";

const StyledBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavBarBtn = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  return (
    <StyledBtnContainer>
      <span>{username}</span>
      {/* bgColor="var(--primary-dark-700)" color="var(--white)" */}
      <Button
        onClick={() => {
          dispatch(logOut());
        }}
      >
        <MdLogout />
      </Button>
    </StyledBtnContainer>
  );
};

export default NavBarBtn;
