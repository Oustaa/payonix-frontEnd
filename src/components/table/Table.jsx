import React from "react";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import Error from "../Error";
import { openAlert } from "../../features/ui-slice";

// components
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Loading from "../Loading";

// styled components
import { Button } from "../../styles";
import {
  StyledTableConainers,
  StyledTable,
  StyledTableHead,
} from "../../styles/styled-table";

const Table = ({
  headers,
  data,
  width,
  tableTitle,
  filter,
  componentName,
  alertTitle,
  id_name,
  endPoint,
  deletable,
}) => {
  const dispatch = useDispatch();

  const openCreateAlertHandler = () => {
    dispatch(openAlert({ name: componentName, type: "create", alertTitle }));
  };

  const openFilterAlertHandler = () => {
    dispatch(openAlert({ name: componentName, type: "filter", alertTitle }));
  };

  return (
    <StyledTableConainers width={width}>
      <StyledTableHead>
        <div>
          <h4>{tableTitle}</h4>
          <Button
            color="var(--white)"
            bgColor="var(--green-cyan)"
            padding="var(--spacing-xsm)"
            onClick={openCreateAlertHandler}
          >
            Add
          </Button>
        </div>
        {/* {filter ? (
          <Button onClick={openFilterAlertHandler} padding="var(--spacing-xsm)">
            <span>Filters </span>
            <MdFilterListAlt />
          </Button>
        ) : null} */}
      </StyledTableHead>
      <StyledTable>
        <TableHeader headers={headers} />
        <TableBody
          name={componentName}
          endPoint={endPoint}
          id_name={id_name}
          data={data}
          headers={headers}
          deletable={deletable}
        />
      </StyledTable>
    </StyledTableConainers>
  );
};

export default Table;
