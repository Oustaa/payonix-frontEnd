import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  overflow-x: scroll;
`;

export const StyledTableHeader = styled.thead`
  background-color: var(--white);
`;

export const StyledTr = styled.tr``;

export const StyledTh = styled.th`
  color: var(--primary-dark-300);
  padding-block: var(--spacing-lg);
  font-size: 0.9rem;
  font-weight: 300;
`;

export const StyledTd = styled.th`
  color: var(--primary-dark-700);
  padding-block: var(--spacing-lg);
  font-weight: 500;
`;

export const StyledTableBody = styled.tbody`
  background-color: var(--white);
`;
