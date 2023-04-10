import React from "react";
import { useSelector } from "react-redux";
import { StyledMenuAlert, Button } from "../styles";

const MenuAlert = () => {
  const {
    cordinates: { x, y },
  } = useSelector((state) => state.ui);

  return (
    <StyledMenuAlert x={x} y={y}>
      <Button onClick={() => window.location.reload()}>Refrech</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </StyledMenuAlert>
  );
};

export default MenuAlert;
