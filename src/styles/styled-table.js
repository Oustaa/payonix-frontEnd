import styled from "styled-components";

export const StyledTableConainers = styled.div`
  width: ${({ width }) => (width ? `${width} !important` : "100%")};
  // min-width: ${({ width }) => (width ? `max-content` : "100%")};
  overflow-x: auto;
  padding-bottom: var(--spacing-lg);
`;

export const StyledTableHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: sticky;
  left: 0;

  & > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-sm);
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  overflow-x: scroll;
  width: ${({ width }) => (width ? `${width}` : "100%")};
  box-shadow: var(--boxShadow);
`;

export const StyledTableHeader = styled.thead`
  background-color: var(--white);
`;

export const StyledTr = styled.tr`
  border-radius: 30px;
`;

export const StyledTh = styled.th`
  color: var(--primary-dark-300);
  padding: var(--spacing-lg) var(--spacing-sm);
  font-size: 0.9rem;
  font-weight: 300;
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
