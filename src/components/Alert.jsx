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
  Delete,
  CreateUser,
} from "./Forms";

import { BsX } from "react-icons/bs";

import { Button } from "../styles";
import { StyledAlert, StyledAlertHeader } from "../styles/styled-alert";

const components = {
  productCategory: { create: <CreateProductCategory /> },
  product: { create: <CreateProduct /> },
  productsInventory: { create: <CreateProductInventory /> },
  rawMaterialBase: { create: <CreateRawMatBase /> },
  rawMaterialsTypes: { create: <CreateRawMatType /> },
  rawMaterialStock: { create: <CreateRawMaterialStock /> },
  rawMaterialInventory: { create: <CreateRawMaterialInventory /> },
  artisan: { create: <CreateArtisan /> },
  artisanCompta: { create: <CreateArtisanCompta /> },
  supplier: { create: <CreateSupplier /> },
  supplierCompta: { create: <CreateSuppliersCompta /> },
  delete: { delete: <Delete /> },
  user: { create: <CreateUser /> },
};

const Alert = () => {
  const dispatch = useDispatch();
  const { alertforName, alertfortype, alertTitle } = useSelector(
    (state) => state.ui
  );

  return (
    <StyledAlert>
      <StyledAlertHeader>
        <h4>{alertTitle}</h4>
        <Button>
          <BsX onClick={() => dispatch(closeAlert())} />
        </Button>
      </StyledAlertHeader>
      {components[alertforName][alertfortype]}
    </StyledAlert>
  );
};

export default Alert;
