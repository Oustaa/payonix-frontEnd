import React from "react";
import { Navigate } from "react-router-dom";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch } from "react-redux";

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
  loading,
  error,
  tableTitle,
  filter,
  componentName,
  alertTitle,
}) => {
  const dispatch = useDispatch();

  if (loading) {
    return <Loading />;
  }

  if (!loading && error) {
    return <Navigate to="/log_in" />;
  }

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
            Add new
          </Button>
        </div>
        {filter ? (
          <Button onClick={openFilterAlertHandler} padding="var(--spacing-xsm)">
            <span>Filters </span>
            <MdFilterListAlt />
          </Button>
        ) : null}
      </StyledTableHead>
      <StyledTable>
        <TableHeader headers={headers} />
        <TableBody data={data} headers={headers} />
      </StyledTable>
    </StyledTableConainers>
  );
};

export default Table;
