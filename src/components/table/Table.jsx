import React from "react";

import styled from "styled-components";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  overflow-x: scroll;
`;

const Table = ({ headers, data }) => {
  return (
    <StyledTable>
      <TableHeader headers={headers} />
      <TableBody data={data} headers={headers} />
    </StyledTable>
  );
};

export default Table;
