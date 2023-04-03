import React from "react";

import { useFetch } from "../hooks/useFetch";

import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

const headers = {
  // "#": { value: "id" },
  "Stock Date": { value: "rms_date_stock", type: "date" },
  "Raw type": { value: "rms_rm_type" },
  Quantity: { value: "rms_quantity" },
  "Unit Price": { value: "rms_unit_price" },
  Amount: { value: "rms_amount" },
  Availabilaty: { value: "rms_availability" },
  "Price / Product": {
    value: "rms_price_prod",
    default: true,
    defaultValue: 0,
  },
};

const RawMaterialsStock = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const { data, loading, error } = useFetch({
    url: "http://localhost:8000/api/rawMaterials/stock",
    config: {
      method: "GET",
      headers: {
        authorization: token,
      },
    },
  });

  return (
    <Table
      headers={headers}
      loading={loading}
      data={data}
      error={error}
      tableTitle="Raw Materials stock:"
      filter={true}
      componentName="rawMaterialStock"
    />
  );
};

export default RawMaterialsStock;
