import React from "react";

import styled from "styled-components";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
`;

const StyledTableConainers = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const Table = ({ headers, data }) => {
  return (
    <StyledTableConainers>
      <StyledTable>
        <TableHeader headers={headers} />
        <TableBody data={data} headers={headers} />
      </StyledTable>
    </StyledTableConainers>
  );
};

export default Table;
