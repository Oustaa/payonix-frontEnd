import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";
import CreateProductForm from "../components/Forms/CreateProductForm";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";

const artisansHeaders = {
  "Artisan name": { value: "a_name" },
  "Phone number": {
    value: "a_phone",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Address: { value: "a_address", default: true, defaultValue: <BsDashLg /> },
  Availability: {
    checked: true,
    check: (data) => {
      if (data["a_total"] < 0) {
        return <StyledTableAlert>{data["a_total"]}</StyledTableAlert>;
      }
      return data["a_total"];
    },
  },
};

const productsVarietyHeaders = {
  "Artisan name": { value: "a_name" },
  "Amount (DH)": { value: "ac_amount" },
  "Translate at": { value: "ac_date", type: "date" },
  Note: { value: "pv_name", default: true, defaultValue: <BsDashLg /> },
};

const Artisans = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const {
    data: artisansData,
    loading: artisansLoading,
    error: artisansError,
  } = useFetch({
    url: "http://localhost:8000/api/artisans",
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
    url: "http://localhost:8000/api/artisans/comptas",
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
        width="40%"
        headers={artisansHeaders}
        data={artisansData}
        loading={artisansLoading}
        error={artisansError}
        tableTitle="Artisans:"
        createForm={() => <CreateProductForm />}
      />
      <Table
        width="60%"
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

export default Artisans;
