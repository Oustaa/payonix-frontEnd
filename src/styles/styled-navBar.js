import styled from "styled-components";

export const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: ${({ sidNavOpen }) =>
    !sidNavOpen ? "space-between" : "flex-end"};
  width: 100%;
  height: 70px;
  padding-inline: var(--spacing-lg);
  position: sticky;
  top: 0;
  z-index: 200;

  background-color: var(--white);
  // padding: var(--spacing-xl);
  // border-bottom-left-radius: var(--radius-lg);
  // border-top-left-radius: var(--radius-lg);

  box-shadow: var(--boxShadow);
`;

export const StyledBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;
