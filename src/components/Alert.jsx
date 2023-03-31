import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../features/ui-slice";

import CreateProductForm from "./Forms/CreateProductForm";

import { BsX } from "react-icons/bs";

import { Button } from "../styles";
import {
  StyledAlertContainer,
  StyledAlert,
  StyledAlertHeader,
} from "../styles/styled-alert";

const components = { product: { create: <CreateProductForm /> } };

const Alert = ({ componentFunction, title }) => {
  const dispatch = useDispatch();
  const component = componentFunction();

  return (
    <StyledAlertContainer>
      <StyledAlert>
        <StyledAlertHeader>
          <h4>{title}</h4>
          <Button>
            <BsX onClick={() => dispatch(closeAlert())} />
          </Button>
        </StyledAlertHeader>
        {component}
      </StyledAlert>
    </StyledAlertContainer>
  );
};

export default Alert;
