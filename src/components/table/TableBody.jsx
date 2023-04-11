import React from "react";

import TableRow from "./TableRow";
import { StyledTableBody } from "../../styles/styled-table";

const TableBody = ({ data, headers, id_name, endPoint, deletable, name }) => {
  const fields = Object.values(headers).filter((field) => {
    return typeof field !== "function";
  });

  return (
    <StyledTableBody>
      {data.map((data, i) => (
        <TableRow
          endPoint={endPoint}
          id={data[id_name]}
          deletable={deletable}
          key={i}
          data={data}
          fields={fields}
          name={name}
        />
      ))}
    </StyledTableBody>
  );
};

export default TableBody;
