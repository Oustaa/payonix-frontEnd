import React from "react";

import { NavLink } from "react-router-dom";

import { StyledNavLinks } from "../../styles/styled-sideNav";

function isActive({ isActive }) {
  return isActive ? "active" : "";
}

const links = [
  { to: "/dashboard", text: "Dashboard" },
  { to: "/products", text: "Products" },
  { to: "/products_inventory", text: "Products Inventory" },
  { to: "/raw_materials", text: "Raw materials" },
  { to: "/raw_material_stock", text: "Raw Material stock" },
  { to: "/raw_material_inventory", text: "Raw Material inventory" },
  { to: "/artisans", text: "Artisans" },
  { to: "/suppliers", text: "Suppliers" },
];

const SideNavLinks = () => {
  return (
    <StyledNavLinks>
      {links.map(({ to, text }, id) => (
        <NavLink key={id} className={isActive} to={to}>
          {text}
        </NavLink>
      ))}
    </StyledNavLinks>
  );
};

export default SideNavLinks;
