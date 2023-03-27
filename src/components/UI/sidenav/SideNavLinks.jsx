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

const SideNavLinks = () => {
  return (
    <StyledNavLinks>
      <NavLink className={isActive} to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className={isActive} to="/products">
        Products
      </NavLink>
      <NavLink className={isActive} to="/products_inventory">
        Products Inventory
      </NavLink>
      <NavLink className={isActive} to="/raw_materials">
        Raw materials
      </NavLink>
      <NavLink className={isActive} to="/raw_material_stock">
        Raw Material stock
      </NavLink>
      <NavLink className={isActive} to="/raw_material_inventory">
        Raw Material inventory
      </NavLink>
      <NavLink className={isActive} to="/artisans">
        Artisans
      </NavLink>
      <NavLink className={isActive} to="/suppliers">
        Suppliers
      </NavLink>
    </StyledNavLinks>
  );
};

export default SideNavLinks;
