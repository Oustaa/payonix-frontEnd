import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../features/ui-slice";

import {
  CreateProductCategory,
  CreateProduct,
  CreateProductInventory,
  CreateRawMatBase,
  CreateRawMatType,
  CreateRawMaterialStock,
  CreateRawMaterialInventory,
  CreateArtisan,
  CreateArtisanCompta,
  CreateSupplier,
  CreateSuppliersCompta,
} from "./Forms";

import { BsX } from "react-icons/bs";

import { Button } from "../styles";
import {
  StyledAlertContainer,
  StyledAlert,
  StyledAlertHeader,
} from "../styles/styled-alert";

const components = {
  product: { create: <CreateProductCategory /> },
  productsVariety: { create: <CreateProduct /> },
  productsInventory: { create: <CreateProductInventory /> },
  rawMaterialBase: { create: <CreateRawMatBase /> },
  rawMaterialsTypes: { create: <CreateRawMatType /> },
  rawMaterialStock: { create: <CreateRawMaterialStock /> },
  rawMaterialInventory: { create: <CreateRawMaterialInventory /> },
  artisan: { create: <CreateArtisan /> },
  artisanCompta: { create: <CreateArtisanCompta /> },
  supplier: { create: <CreateSupplier /> },
  supplierCompta: { create: <CreateSuppliersCompta /> },
};

const Alert = () => {
  const dispatch = useDispatch();
  const { alertFor, alertTitle } = useSelector((state) => state.ui);

  return (
    <StyledAlertContainer>
      <StyledAlert>
        <StyledAlertHeader>
          <h4>{alertTitle}</h4>
          <Button>
            <BsX onClick={() => dispatch(closeAlert())} />
          </Button>
        </StyledAlertHeader>
        {components[alertFor?.name][alertFor?.type]}
      </StyledAlert>
    </StyledAlertContainer>
  );
};

export default Alert;
