import React from "react";

import TableRow from "./TableRow";
import { StyledTableBody } from "../../styles/styled-table";

const TableBody = ({ data, headers }) => {
  const fields = Object.values(headers).filter((field) => {
    return typeof field !== "function";
  });

  return (
    <StyledTableBody>
      {data.map((data, i) => (
        <TableRow key={i} data={data} fields={fields} />
      ))}
    </StyledTableBody>
  );
};

export default TableBody;
