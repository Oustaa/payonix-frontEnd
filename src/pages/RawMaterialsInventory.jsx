import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

const headers = {
  "Inventory Date": { value: "rmi_date", type: "date" },
  "Raw Material origin": { value: "rmi_raw_mat_stock_id" },
  Artisan: { value: "a_name" },
  Quantity: { value: "rmi_quantity" },
  "Unit Price": { value: "rmi_unit_price" },
  Amount: { value: "rmi_amount" },
  "Estemated product's number": { value: "rmi_estimated_nbr_prod" },
  "Received product's number": { value: "rmi_number_prods_recived" },
  Completed: { value: "catigory" },
  "Raw material / Product": { value: "pi_raw_mat_inv_id" },
  "Raw material price / Product": { value: "pi_raw_mat_inv_id" },
};

const RawMaterialsInventory = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const { data, loading, error } = useFetch({
    url: "http://localhost:8000/rawMaterials/inventory",
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

export default RawMaterialsInventory;
