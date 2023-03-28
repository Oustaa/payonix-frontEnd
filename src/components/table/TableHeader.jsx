import React from "react";

import { StyledTableHeader, StyledTh, StyledTr } from "../../styles/table";

const TableHeader = ({ headers }) => {
  return (
    <StyledTableHeader>
      <StyledTr>
        {Object.keys(headers).map((header, i) => (
          <StyledTh key={i}>{header}</StyledTh>
        ))}
      </StyledTr>
    </StyledTableHeader>
  );
};

export default TableHeader;
