import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  overflow-x: scroll;
`;

export const StyledTableHeader = styled.thead`
  background-color: var(--white);
`;

export const StyledTr = styled.tr`
  border-radius: 30px;
`;

export const StyledTh = styled.th`
  color: var(--primary-dark-300);
  padding-block: var(--spacing-lg);
  font-size: 0.9rem;
  font-weight: 300;
  padding-block: var(--spacing-lg);
`;

export const StyledTd = styled.td`
  color: var(--primary-dark-700);
  padding-block: var(--spacing-lg);
  padding-inline: var(--spacing-sm);
  font-weight: 500;
  text-align: center;

  &.image {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledTableBody = styled.tbody`
  background-color: var(--white);
`;
