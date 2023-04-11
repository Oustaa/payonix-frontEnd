import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getProductsVariety } from "../features/products-slice";
import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";

const productsCategoriesHeaders = {
  // image: { value: "p_image", type: "image" },
  Name: { value: "pc_name" },
  // availability: { value: "p_availibality", default: true, defaultValue: 0 },
};

const productsHeaders = {
  image: { value: "p_image", type: "image" },
  Name: { value: "p_name" },
  Description: {
    value: "p_description",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Category: {
    value: "p_category_name",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Availability: {
    checked: true,
    check: (data) => {
      if (
        data["p_availibility"] < data["p_reorder_point"] &&
        !Boolean(data["p_command_lanched"])
      ) {
        return <StyledTableAlert>{data["p_availibility"]}</StyledTableAlert>;
      }
      return data["p_availibility"];
    },
  },
  "Reorder Point": {
    value: "p_reorder_point",
    check: (data) => {
      return data["p_description"];
    },
  },

  "Command Launched": {
    checked: true,
    check: (data) => {
      if (
        data["p_availibility"] < data["p_reorder_point"] &&
        !Boolean(data["p_command_lanched"])
      ) {
        return <StyledTableAlert>Not yet!</StyledTableAlert>;
      }
      return <BsDashLg />;
    },
  },
};

const Products = () => {
  const dispatch = useDispatch();
  const { products, varity } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = products;
  const {
    data: productsVarietyData,
    loading: productsVarietyLoading,
    error: productsVarietyError,
  } = varity;

  useEffect(() => {
    if (productsData.length === 0) dispatch(getProducts({ token }));
    if (productsVarietyData.length === 0)
      dispatch(getProductsVariety({ token }));
  }, []);

  return (
    <>
      <FlexContainer>
        <Table
          width="15%"
          headers={productsCategoriesHeaders}
          data={productsData}
          loading={productsLoading}
          error={productsError}
          tableTitle="Categories:"
          alertTitle="Create new Category"
          componentName="productCategory"
          id_name="pc_id"
          endPoint="/products/category"
        />
        <Table
          width="85%"
          headers={productsHeaders}
          data={productsVarietyData}
          loading={productsVarietyLoading}
          error={productsVarietyError}
          tableTitle="Products:"
          componentName="product"
          alertTitle="Create new product"
          filter={true}
          id_name="p_id"
          endPoint="/products"
          deletable={true}
        />
      </FlexContainer>
    </>
  );
};

export default Products;
