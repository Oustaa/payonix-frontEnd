import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMaterialsInventory,
  updateInventory,
} from "../features/rawMaterial-slice";
import Table from "../components/table/Table";
import { StyledTableAlert } from "../styles";
import Loading from "../components/Loading";
import Error from "../components/Error";

const headers = {
  "Inventory Date": { value: "rmi_date", type: "date" },
  "Raw Material origin": { value: "rmi_raw_mat_stock_id" },
  Artisan: { value: "a_name" },
  Quantity: { value: "rmi_quantity" },
  "Unit Price": { value: "rmi_unit_price" },
  Amount: { value: "rmi_amount" },
  "Estemated product's number": {
    changable: true,
    inputType: "number",
    url: `${process.env.REACT_APP_BASE_URL}/rawMaterials/inventory`,
    id: (data) => data["rmi_id"],
    value: "rmi_estimated_nbr_prod",
    name: "rmi_estimated_nbr_prod",
    dispatch: { function: updateInventory, values: {} },
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
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.materials.inventory
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data.length === 0) dispatch(getMaterialsInventory({ token }));
  }, []);

  if (loading) return <Loading />;
  if (error && !data) return <Error />;

  return (
    <Table
      headers={headers}
      data={data}
      tableTitle="Raw Material Inventory:"
      filter={true}
      alertTitle="Add Material Inventory"
      componentName="rawMaterialInventory"
      endPoint="/rawMaterials/inventory"
      id_name="rmi_id"
      deletable={true}
    />
  );
};

export default RawMaterialsInventory;
