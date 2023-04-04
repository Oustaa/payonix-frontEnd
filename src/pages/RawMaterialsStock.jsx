import React, { useEffect } from "react";
import Table from "../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getMaterialsStock } from "../features/rawMaterial-slice";

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
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.materials.stock
  );

  useEffect(() => {
    if (data.length === 0) dispatch(getMaterialsStock());
  }, []);

  return (
    <Table
      headers={headers}
      loading={loading}
      data={data}
      error={error}
      tableTitle="Raw Materials stock:"
      filter={true}
      componentName="rawMaterialStock"
      alertTitle={"Create a new Material Stock"}
    />
  );
};

export default RawMaterialsStock;
