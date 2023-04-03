import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";
import { BsDashLg } from "react-icons/bs";
import Table from "../components/table/Table";
import { StyledTableAlert } from "../styles";

const headers = {
  "Inventory Date": { value: "rmi_date", type: "date" },
  "Raw Material origin": { value: "rmi_raw_mat_stock_id" },
  Artisan: { value: "a_name" },
  Quantity: { value: "rmi_quantity" },
  "Unit Price": { value: "rmi_unit_price" },
  Amount: { value: "rmi_amount" },
  "Estemated product's number": {
    value: "rmi_estimated_nbr_prod",
    default: true,
    defaultValue: <BsDashLg />,
  },
  "Received product's number": { value: "rmi_number_prods_recived" },
  Completed: {
    checked: true,
    check: (data) => {
      if (data["rmi_estimated_nbr_prod"] < data["rmi_number_prods_recived"]) {
        return <StyledTableAlert type="danger">not yet</StyledTableAlert>;
      }
      return <StyledTableAlert type="success">Completed</StyledTableAlert>;
    },
  },
  "Raw material / Product": { value: "rmi_rawMat_prod" },
  "Raw material price / Product": { value: "rmi_rawMat_price_prod" },
};

// toFixed(2)

const RawMaterialsInventory = () => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const { data, loading, error } = useFetch({
    url: "http://localhost:8000/api/rawMaterials/inventory",
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
      tableTitle="Raw Material Inventory:"
      filter={true}
      alertTitle="Add Material Inventory"
      componentName="rawMaterialInventory"
    />
  );
};

export default RawMaterialsInventory;
