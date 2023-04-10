import styled from "styled-components";

export const StyledTableConainers = styled.div`
  width: ${({ width }) => (width ? `${width}` : "100%")};
  // min-width: ${({ width }) => (width ? `max-content` : "100%")};
  overflow-x: auto;
  max-height: calc(100vh - var(--spacing-lg) - 90px);
  height: fit-content;
  margin-bottom: var(--spacing-lg);
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--primary-dark-200);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-dark-500);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark-600);
  }

  & + & {
    margin-left: var(--spacing-lg);
  }
`;

export const StyledTableHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--white);
  padding: var(--spacing-sm);
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
  width: ${({ width }) => (width ? `${width} !important` : "100%")};
  min-width: max-content;
  box-shadow: var(--boxShadow);
  position: relative;
`;

export const StyledTableHeader = styled.thead`
  background-color: var(--white);
  position: sticky;
  top: 48px;
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
