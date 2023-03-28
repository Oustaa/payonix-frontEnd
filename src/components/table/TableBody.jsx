import React from "react";

import TableRow from "./TableRow";
import { StyledTableBody } from "../../styles/table";

const TableBody = ({ data, headers }) => {
  const fields = Object.values(headers);

  return (
    <StyledTableBody>
      {data.map((data, i) => (
        <TableRow data={data} fields={fields} />
      ))}
    </StyledTableBody>
  );
};

export default TableBody;
