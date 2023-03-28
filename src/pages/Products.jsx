import React from "react";

import Table from "../components/table/Table";

const Products = () => {
  const headers = {
    "#": "pi_id",
    "Inventory Date": "pi_date",
    name: "pi_prod_variant_id",
    Quantity: "pi_quantity",
    "Unit Price": "pi_unit_price",
    Amount: "pi_amount",
    "Material Origin": "pi_raw_mat_inv_id",
    Vendor: "pi_artisan_id",
  };
  const data = [
    {
      id: 1,
      pi_id: "caf13813-5410-4364-b16c-9a0d759a56a3",
      // Inventory Date
      pi_date: "2023-03-24",
      // name
      // category
      pi_quantity: 23,
      pi_unit_price: 21,
      pi_amount: 483,
      pi_artisan_id: null,
      // Material Origin
      pi_raw_mat_inv_id: "7ce779d7-cda3-43da-be9e-1b8a60122143",
      // Vendor
      pi_prod_variant_id: "b34662c7-1b6f-4139-bcdc-372b795c11f0",
      createdAt: "2023-03-24",
      updatedAt: "2023-03-24",
    },
    {
      id: 2,
      pi_id: "e71467cf-6d06-45b1-bbca-8391ccb82b59",
      pi_date: "2023-03-24",
      pi_quantity: 23,
      pi_unit_price: 21,
      pi_amount: 483,
      pi_artisan_id: null,
      pi_raw_mat_inv_id: "7ce779d7-cda3-43da-be9e-1b8a60122143",
      pi_prod_variant_id: "b34662c7-1b6f-4139-bcdc-372b795c11f0",
      createdAt: "2023-03-24",
      updatedAt: "2023-03-24",
    },
  ];
  return (
    <div>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Products;
