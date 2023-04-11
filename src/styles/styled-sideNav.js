import styled from "styled-components";

export const StyledSidNav = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: var(--white);
  padding-inline: var(--spacing-lg);

  box-shadow: var(--boxShadow);
  top: 0;
  transition: transform 200ms ease-in;
  ${({ open }) => {
    if (!open) {
      return `
              position: absolute;
              transform: translate(-100%)
            `;
    }
    return `
    position: sticky;
    transform: unset;
    `;
  }};

  // @media (max-width: 900px) {
  //   position: absolute;
  //   transform: translateX(-100%);
  // }
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-blue-800);
  height: 70px;

  img {
    width: 100px;
  }
`;

export const StyledNavLinks = styled.div`
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
