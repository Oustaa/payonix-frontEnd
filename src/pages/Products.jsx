import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getProductsVariety } from "../features/products-slice";
import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";

const productsCategoriesHeaders = {
  // image: { value: "p_image", type: "image" },
  Name: { value: "p_name" },
  // availability: { value: "p_availibality", default: true, defaultValue: 0 },
};

const productsVarietyHeaders = {
  image: { value: "pv_image", type: "image" },
  Name: { value: "pv_name" },
  Description: {
    value: "pv_description",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Availability: {
    checked: true,
    check: (data) => {
      if (
        data["pv_availibility"] < data["pv_reorder_point"] &&
        !Boolean(data["pv_command_lanched"])
      ) {
        return <StyledTableAlert>{data["pv_availibility"]}</StyledTableAlert>;
      }
      return data["pv_availibility"];
    },
  },
  "Reorder Point": {
    value: "pv_reorder_point",
    check: (data) => {
      return data["pv_description"];
    },
  },

  "Command Launched": {
    checked: true,
    check: (data) => {
      if (
        data["pv_availibility"] < data["pv_reorder_point"] &&
        !Boolean(data["pv_command_lanched"])
      ) {
        return <StyledTableAlert>Not yet!</StyledTableAlert>;
      }
      return <BsDashLg />;
    },
  },
};

const Products = () => {
  const dispatch = useDispatch();
  const { products, varity } = useSelector((state) => state.products);
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = products;
  const {
    data: productsVarietyData,
    loading: productsVarietyLoading,
    error: productsVarietyError,
  } = varity;

  useEffect(() => {
    if (productsData.length === 0) dispatch(getProducts());
    if (productsVarietyData.length === 0) dispatch(getProductsVariety());
  }, []);

  return (
    <>
      <FlexContainer>
        <Table
          width="15%"
          headers={productsCategoriesHeaders}
          data={productsData}
          loading={productsLoading}
          error={productsError}
          tableTitle="Categories:"
          alertTitle="Create new Category"
          componentName="product"
        />
        <Table
          width="85%"
          headers={productsVarietyHeaders}
          data={productsVarietyData}
          loading={productsVarietyLoading}
          error={productsVarietyError}
          tableTitle="Product Varieties:"
          componentName="productsVariety"
          alertTitle="Create new product variety"
          filter={true}
        />
      </FlexContainer>
    </>
  );
};

export default Products;
