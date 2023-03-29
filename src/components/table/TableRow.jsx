import React from "react";

import { StyledTr, StyledTd } from "../../styles/table";

const TableRow = ({ data, fields }) => {
  return (
    <StyledTr>
      {fields.map((field, i) => (
        <StyledTd key={i}>{data[field] ? data[field] : "none"}</StyledTd>
      ))}
    </StyledTr>
  );
};

export default TableRow;
