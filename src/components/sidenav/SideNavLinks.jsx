import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const StyledNavLinks = styled.div`
  margin-top: var(--spacing-xxl);
  a {
    padding: var(--spacing-sm);
    display: inline-block;
    width: 100%;
    color: var(--primary-dark-600);
    font-size: 1.1rem;
    font-weight: 300;

    &:hover,
    &:focus,
    &.active {
      color: var(--primary-blue-800);
      background-color: var(--primary-dark-100);
      border-radius: var(--radius-sm);
      border: none !important;
    }
  }
`;

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
