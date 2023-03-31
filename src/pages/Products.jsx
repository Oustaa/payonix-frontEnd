import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";
import CreateProductForm from "../components/Forms/CreateProductForm";

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
      console.log(data);
      if (
        data["pv_availibility"] < data["pv_reorder_point"] &&
        !Boolean(data["pv_command_lanched"])
      ) {
        return <StyledTableAlert>{data["pv_availibility"]}</StyledTableAlert>;
      }
      return data["rmt_availability"];
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
      console.log(data);
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
        tableTitle="Products:"
        createForm={() => <CreateProductForm />}
      />
      <Table
        width="80%"
        headers={productsVarietyHeaders}
        data={productsVarietyData}
        loading={productsVarietyLoading}
        error={productsVarietyError}
        tableTitle="Product Varieties:"
        filter={true}
      />
    </FlexContainer>
  );
};

export default Products;
