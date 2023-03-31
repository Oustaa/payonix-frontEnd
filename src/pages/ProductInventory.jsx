import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

const headers = {
  "#": { value: "id" },
  "Inventory Date": { value: "pi_date", type: "date" },
  name: { value: "name" },
  Category: { value: "catigory" },
  Quantity: { value: "pi_quantity" },
  "Unit Price": { value: "pi_unit_price" },
  Amount: { value: "pi_amount" },
  "Material Origin": { value: "pi_raw_mat_inv_id" },
  Vendor: { value: "vendor" },
};

const ProductInventory = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const { data, loading, error } = useFetch({
    url: "http://localhost:8000/api/products/inventory",
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
      tableTitle="Product Inventory:"
      filter={true}
    />
  );
};

export default ProductInventory;
