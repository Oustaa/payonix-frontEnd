import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ProductInventory from "../pages/ProductInventory";
import RawMaterials from "../pages/RawMaterials";
import RawMaterialsInventory from "../pages/RawMaterialsInventory";
import RawMaterialsStock from "../pages/RawMaterialsStock";
import Artisans from "../pages/Artisans";
import Suppliers from "../pages/Suppliers";

import Layout from "./UI/Layout";

const ProtectedRoutes = () => {
  const isLoggedin = useSelector((state) => state.auth.value);

  if (!isLoggedin) {
    return <Navigate to="/log_in" replace />;
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products_inventory" element={<ProductInventory />} />
        <Route path="/raw_materials" element={<RawMaterials />} />
        <Route path="/raw_material_stock" element={<RawMaterialsStock />} />
        <Route
          path="/raw_material_inventory"
          element={<RawMaterialsInventory />}
        />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
