import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";
import Table from "../components/table/Table";

import { FlexContainer } from "../styles";

const productsHeaders = {
  // image: { value: "p_image", type: "image" },
  Name: { value: "p_name" },
  availability: { value: "p_availibality", default: true, defaultValue: 0 },
};

const productsVarietyHeaders = {
  image: { value: "pv_image", type: "image" },
  Name: { value: "pv_name" },
  Description: { value: "pv_description" },
  Availability: { value: "pv_availibility" },
  "Reorder Point": { value: "pv_reorder_point" },
  "Command Launched": { value: "pv_command_lanched" },
};

const Products = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch({
    url: "http://localhost:8000/products",
    config: {
      method: "GET",
      headers: {
        authorization: token,
      },
    },
  });
  const {
    data: productsVarietyData,
    loading: productsVarietyLoading,
    error: productsVarietyError,
  } = useFetch({
    url: "http://localhost:8000/products/variety",
    config: {
      method: "GET",
      headers: {
        authorization: token,
      },
    },
  });

  return (
    <FlexContainer>
      <Table
        width="20%"
        headers={productsHeaders}
        data={productsData}
        loading={productsLoading}
        error={productsError}
        tableTitle="Products"
      />
      <Table
        width="80%"
        headers={productsVarietyHeaders}
        data={productsVarietyData}
        loading={productsVarietyLoading}
        error={productsVarietyError}
        tableTitle="Product Varieties"
      />
    </FlexContainer>
  );
};

export default Products;
