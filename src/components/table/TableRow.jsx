import React from "react";

import { StyledTr, StyledTd } from "../../styles/table";

const TableRow = ({ data, fields }) => {
  console.log(data, fields);
  return (
    <StyledTr>
      {fields.map((field, i) => (
        <StyledTd key={i}>{data[field]}</StyledTd>
      ))}
    </StyledTr>
  );
};

export default TableRow;
