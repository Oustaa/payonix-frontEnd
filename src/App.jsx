import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import LogIn from "./pages/LogIn";
import Alert from "./components/Alert";
import ProtectedRoutes from "./components/ProtectedRoutes";

// pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductInventory from "./pages/ProductInventory";
import RawMaterials from "./pages/RawMaterials";
import RawMaterialsInventory from "./pages/RawMaterialsInventory";
import RawMaterialsStock from "./pages/RawMaterialsStock";
import Artisans from "./pages/Artisans";
import Suppliers from "./pages/Suppliers";

import GlobalStyles from "./styles/globalStyles";

const App = () => {
  const { alertOpen } = useSelector((state) => state.ui);

  return (
    <>
      {/* <img
        src="https://localhost:8000/images/1681124757326-20210317_212114.jpg"
        alt="sd"
      /> */}
      {alertOpen ? <Alert /> : null}
      <Router>
        <Routes>
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
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
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;
