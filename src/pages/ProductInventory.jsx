import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInventory } from "../features/productsInventory-slice";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

const headers = {
  "#": "id",
  "Inventory Date": "pi_date",
  name: "name",
  Category: "catigory",
  Quantity: "pi_quantity",
  "Unit Price": "pi_unit_price",
  Amount: "pi_amount",
  "Material Origin": "pi_raw_mat_inv_id",
  Vendor: "vendor",
};

const ProductInventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value, status, error } = useSelector((state) => state.p_inventory);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (!status) {
      dispatch(getProductsInventory({ token: cookies.access_token }));
    }
  }, [status, dispatch, cookies]);

  useEffect(() => {
    if (status === "error" && error?.code === "ERR_BAD_REQUEST") {
      console.log("Error accure in this page: " + error);
      return navigate("/log_in");
    }
  }, [error, status, navigate]);

  return (
    <div>
      <Table headers={headers} data={value} />
    </div>
  );
};

export default ProductInventory;
