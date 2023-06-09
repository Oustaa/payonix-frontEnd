import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsInventory } from "../features/products-slice";

import Table from "../components/table/Table";
import Loading from "../components/Loading";
import Error from "../components/Error";

const headers = {
  // "#": { value: "id" },
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
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.products.inventory
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data.length === 0) dispatch(getProductsInventory({ token }));
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Table
      headers={headers}
      data={data}
      tableTitle="Product Inventory:"
      filter={true}
      componentName="productsInventory"
      alertTitle="Create Product Inventory"
      id_name="pi_id"
      endPoint="/products/inventory"
      deletable={true}
    />
  );
};

export default ProductInventory;
