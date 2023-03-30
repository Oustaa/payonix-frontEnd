import React from "react";

import styled from "styled-components";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Loading from "../Loading";
import { Navigate } from "react-router-dom";
import { Button } from "../../styles";
const StyledTable = styled.table`
  width: ${({ width }) => (width ? `${width} !important` : "100%")};
  min-width: ${({ width }) => (width ? `${width}` : "max-content")};
  box-shadow: var(--boxShadow);
  position: sticky;
  bottom: 0;
`;

const StyledTableConainers = styled.div`
  width: ${({ width }) => (width ? `${width} !important` : "100%")};
  min-width: ${({ width }) => (width ? `${width} !important` : "100%")};
  overflow-x: auto;
  padding-bottom: var(--spacing-lg);
`;

const StyledTableHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
`;

const Table = ({ headers, data, width, loading, error, tableTitle }) => {
  // const { width, maxWidth } = dimontions;

  if (loading) {
    return <Loading />;
  }

  if (!loading && error) {
    return <Navigate to="/log_in" />;
  }

  return (
    <StyledTableConainers width={width}>
      <StyledTableHead>
        <h4>{tableTitle}</h4>
        <Button
          color="var(--white)"
          bgColor="var(--green-cyan)"
          padding="var(--spacing-xsm)"
        >
          Add new
        </Button>
      </StyledTableHead>
      <StyledTable>
        <TableHeader headers={headers} />
        <TableBody data={data} headers={headers} />
      </StyledTable>
    </StyledTableConainers>
  );
};

export default Table;
