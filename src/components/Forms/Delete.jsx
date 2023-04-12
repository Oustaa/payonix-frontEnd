import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "../../features/ui-slice";
import {
  deletProducts,
  deletProductsCategory,
  deletProductsInventory,
} from "../../features/products-slice";
import { deletArtisan, deletArtisanCompta } from "../../features/artisan-slice";
import {
  deletBase,
  deletType,
  deletStock,
  deletInventory,
} from "../../features/rawMaterial-slice";
import {
  deletSupplier,
  deletSupplierCompta,
} from "../../features/supplier-slice";
import { deletUsers } from "../../features/user-slice";
import styled from "styled-components";
import { Button } from "../../styles";
import axios from "axios";

const StyledDeletAlert = styled.div`
  color: var(--primary-dark-700);
  div {
    padding-top: var(--spacing-sm);
    display: flex;
    justify-content: space-around;
  }

  h5 {
    color: var(--danger);
  }
`;

const BASE_URL = process.env.REACT_APP_BASE_URL;

const functionTodispatch = {
  "/products": deletProducts,
  "/products/inventory": deletProductsInventory,
  "/products/category": deletProductsCategory,
  "/rawMaterials/bases": deletBase,
  "/rawMaterials/types": deletType,
  "/rawMaterials/inventory": deletInventory,
  "/rawMaterials/stock": deletStock,
  "/artisans": deletArtisan,
  "/artisans/comptas": deletArtisanCompta,
  "/suppliers": deletSupplier,
  "/suppliers/comptas": deletSupplierCompta,
  "/users": deletUsers,
};

const Delete = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id, endPoint } = useSelector((state) => state.ui);
  const URL = `${BASE_URL}${endPoint}/${id}`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(URL, {
        headers: { authorization: token },
      });

      const data = response.data;

      if (data.deletionCount === 1) {
        dispatch(functionTodispatch[endPoint]({ id }));
        dispatch(closeAlert());
      }
    } catch (error) {
      setError(error.response?.data?.error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDeletAlert>
      <h4>Are you sure, you want to delete item with id {id}</h4>
      <h5>{error && error}</h5>
      <div>
        <Button
          onClick={deleteHandler}
          color="var(--white)"
          bgColor="var(--danger)"
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
        <Button
          color="var(--white)"
          bgColor="var(--primary-cyan-800)"
          onClick={() => dispatch(closeAlert())}
        >
          Cancel
        </Button>
      </div>
    </StyledDeletAlert>
  );
};

export default Delete;
