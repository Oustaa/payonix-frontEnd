import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";

const productsHeaders = {
  // image: { value: "p_image", type: "image" },
  Name: { value: "p_name" },
  availability: { value: "p_availibality", default: true, defaultValue: 0 },
};

const productsVarietyHeaders = {
  image: { value: "pv_image", type: "image" },
  Name: { value: "pv_name" },
  Description: { value: "pv_description" },
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
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch({
    url: "http://localhost:8000/api/products",
  });
  const {
    data: productsVarietyData,
    loading: productsVarietyLoading,
    error: productsVarietyError,
  } = useFetch({
    url: "http://localhost:8000/api/products/variety",
  });

  return (
    <>
      <FlexContainer>
        <Table
          width="20%"
          headers={productsHeaders}
          data={productsData}
          loading={productsLoading}
          error={productsError}
          tableTitle="Products:"
          alertTitle="Create new title"
          componentName="product"
        />
        <Table
          width="80%"
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
