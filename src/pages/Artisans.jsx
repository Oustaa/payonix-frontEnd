import React, { useEffect } from "react";

import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { getArtisansCompta, getArtisans } from "../features/artisan-slice";

const artisansHeaders = {
  "Artisan name": { value: "a_name" },
  "Phone number": {
    value: "a_phone",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Address: { value: "a_address", default: true, defaultValue: <BsDashLg /> },
  Total: {
    checked: true,
    check: (data) => {
      if (data["a_total"] < 0) {
        return <StyledTableAlert>{data["a_total"]}</StyledTableAlert>;
      }
      return data["a_total"];
    },
  },
};

const productsVarietyHeaders = {
  "Artisan name": { value: "a_name" },
  "Amount (DH)": { value: "ac_amount" },
  "Translate at": { value: "ac_date", type: "date" },
  Note: { value: "ac_note", default: true, defaultValue: <BsDashLg /> },
};

const Artisans = () => {
  const dispatch = useDispatch();
  const { artisans, artisans_compta } = useSelector((state) => state.artisans);

  const {
    data: artisansData,
    loading: artisansLoading,
    error: artisansError,
    type: artisansType,
  } = artisans;

  const {
    data: productsVarietyData,
    loading: productsVarietyLoading,
    error: productsVarietyError,
  } = artisans_compta;

  useEffect(() => {
    if (!artisans.data.length) {
      dispatch(getArtisans());
    }
    if (!artisans_compta.data.length) {
      dispatch(getArtisansCompta());
    }
  }, []);

  return (
    <FlexContainer>
      <Table
        width="40%"
        headers={artisansHeaders}
        data={artisansData}
        loading={artisansLoading}
        type={artisansType}
        error={artisansError}
        tableTitle="Artisans:"
        componentName="artisan"
        alertTitle="Create Artisan"
      />
      <Table
        width="60%"
        headers={productsVarietyHeaders}
        data={productsVarietyData}
        loading={productsVarietyLoading}
        error={productsVarietyError}
        tableTitle="Artisans Compta:"
        filter={true}
        componentName="artisanCompta"
        alertTitle="Create Artisan Compta"
      />
    </FlexContainer>
  );
};

export default Artisans;
