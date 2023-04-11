import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyledMenuAlert, Button } from "../styles";
import { openAlert, closeRightClickAlert } from "../features/ui-slice";

const MenuAlert = () => {
  const dispatch = useDispatch();
  const {
    cordinates: { x, y },
    deletable,
  } = useSelector((state) => state.ui);

  const openDeleleAlert = () => {
    dispatch(closeRightClickAlert());
    dispatch(
      openAlert({
        name: "delete",
        type: "delete",
        alertTitle: "Delete",
      })
    );
  };

  const openUpdateAlert = () => {
    dispatch(closeRightClickAlert());
    dispatch(
      openAlert({
        name: "delete",
        type: "delete",
        alertTitle: "Delete",
      })
    );
  };

  return (
    <StyledMenuAlert x={x} y={y}>
      <Button onClick={() => window.location.reload()}>Refrech</Button>
      <Button onClick={openUpdateAlert}>Edit</Button>
      {deletable && <Button onClick={openDeleleAlert}>Delete</Button>}
    </StyledMenuAlert>
  );
};

export default MenuAlert;
