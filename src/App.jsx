import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { closeAlert, closeRightClickAlert } from "./features/ui-slice";
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
import Users from "./pages/Users";

import GlobalStyles from "./styles/globalStyles";
import MenuAlert from "./components/MenuAlert";
import BackDrop from "./components/BackDrop";

const App = () => {
  const dispatch = useDispatch();
  const { alertOpen } = useSelector((state) => state.ui);
  const { rightClickMenuOpen } = useSelector((state) => state.ui);
  return (
    <>
      {alertOpen ? (
        <>
          <Alert />
          {createPortal(
            <BackDrop
              clickHandler={() => dispatch(closeAlert())}
              dark={true}
            />,
            document.getElementById("backDrop")
          )}
        </>
      ) : null}

      {rightClickMenuOpen ? (
        <>
          <MenuAlert />
          {createPortal(
            <BackDrop
              clickHandler={() => dispatch(closeRightClickAlert())}
              dark={false}
            />,
            document.getElementById("backDrop")
          )}
        </>
      ) : null}

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
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;
