import React from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { resetArtisans } from "../../features/artisan-slice";
import { resetSuppliers } from "../../features/supplier-slice";
import { resetProducts } from "../../features/products-slice";
import { resetMaterials } from "../../features/rawMaterial-slice";
import { resetUsers } from "../../features/user-slice";
import { logOut as logout } from "../../features/auth-slice";

import { Button } from "../../styles";
import { StyledBtnContainer } from "../../styles/styled-navBar";

const NavBarBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const logOut = () => {
    setCookies("access_token", null);
    setCookies("user_name", null);
    dispatch(resetArtisans());
    dispatch(resetSuppliers());
    dispatch(resetProducts());
    dispatch(resetMaterials());
    dispatch(resetUsers());
    dispatch(logout());
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
