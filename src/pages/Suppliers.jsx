import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers, getSuppliersCompta } from "../features/supplier-slice";

import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";
import Loading from "../components/Loading";
import Error from "../components/Error";

const suppliersHeaders = {
  "Supplier name": { value: "s_name" },
  "Phone number": {
    value: "s_phone",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Address: { value: "s_address", default: true, defaultValue: <BsDashLg /> },
  Total: {
    checked: true,
    check: (data) => {
      if (data["s_total"] < 0) {
        return <StyledTableAlert>{data["s_total"]}</StyledTableAlert>;
      }
      return data["s_total"];
    },
  },
};

const supplersComptaHeaders = {
  "Supplier name": { value: "s_name" },
  "Amount (DH)": { value: "sc_amount" },
  "Translate at": { value: "sc_date", type: "date" },
  Note: { value: "sc_note", default: true, defaultValue: <BsDashLg /> },
};

const Suppliers = () => {
  const dispatch = useDispatch();
  const { suppliers, suppliers_compta } = useSelector(
    (state) => state.suppliers
  );
  const { token } = useSelector((state) => state.auth);

  const {
    data: suppliersData,
    loading: suppliersLoading,
    error: suppliersError,
  } = suppliers;

  const {
    data: suppliersComptaData,
    loading: suppliersComptaLoading,
    error: suppliersComptaError,
  } = suppliers_compta;

  useEffect(() => {
    if (suppliers.data.length === 0) {
      dispatch(getSuppliers({ token }));
    }
    if (suppliers_compta.data.length === 0) {
      dispatch(getSuppliersCompta({ token }));
    }
  }, []);

  if (suppliersLoading || suppliersComptaLoading) return <Loading />;
  if (suppliersError || suppliersComptaError)
    return <Error message={"Internale Server Error"} />;

  return (
    <FlexContainer>
      <Table
        width="40%"
        headers={suppliersHeaders}
        data={suppliersData}
        tableTitle="Suppliers:"
        componentName="supplier"
        alertTitle="Create Supplier"
        endPoint="/suppliers"
        id_name="s_id"
        deletable={true}
      />
      <Table
        width="60%"
        headers={supplersComptaHeaders}
        data={suppliersComptaData}
        tableTitle="Supplier Compta:"
        filter={true}
        componentName="supplierCompta"
        alertTitle="Create Supplier Compta"
        endPoint="/suppliers/comptas"
        id_name="sc_id"
        deletable={true}
      />
    </FlexContainer>
  );
};

export default Suppliers;
