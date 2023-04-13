import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtisans, getArtisansCompta } from "../features/artisan-slice";

import Table from "../components/table/Table";

import { FlexContainer, StyledTableAlert } from "../styles";
import { BsDashLg } from "react-icons/bs";
import Loading from "../components/Loading";
import Error from "../components/Error";

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

const artisansComptaHeaders = {
  "Artisan name": {
    checked: true,
    check: (data) => {
      if (data["a_name"]) {
        return data["a_name"];
      }
      return data["ac_artisan_id"];
    },
  },
  "Amount (DH)": { value: "ac_amount" },
  "Translate at": { value: "ac_date", type: "date" },
  Note: { value: "ac_note", default: true, defaultValue: <BsDashLg /> },
};

const Artisans = () => {
  const dispatch = useDispatch();
  const { artisans, artisans_compta } = useSelector((state) => state.artisans);
  const { token } = useSelector((state) => state.auth);

  const {
    data: artisansData,
    loading: artisansLoading,
    error: artisansError,
  } = artisans;

  const {
    data: artisansComptaData,
    loading: artisansComptaLoading,
    error: artisansComptaError,
  } = artisans_compta;

  useEffect(() => {
    if (artisans.data.length === 0) {
      dispatch(getArtisans({ token }));
    }
    if (artisans_compta.data.length === 0) {
      dispatch(getArtisansCompta({ token }));
    }
  }, []);

  if (artisansLoading || artisansComptaLoading) return <Loading />;
  if (artisansError || artisansComptaError) return <Error />;

  return (
    <FlexContainer>
      <Table
        width="40%"
        headers={artisansHeaders}
        data={artisansData}
        tableTitle="Artisans:"
        componentName="artisan"
        alertTitle="Create Artisan"
        endPoint="/artisans"
        id_name="a_id"
        deletable={true}
      />
      <Table
        width="60%"
        headers={artisansComptaHeaders}
        data={artisansComptaData}
        tableTitle="Artisans Compta:"
        filter={true}
        componentName="artisanCompta"
        alertTitle="Create Artisan Compta"
        endPoint="/artisans/comptas"
        id_name="ac_id"
        deletable={true}
      />
    </FlexContainer>
  );
};

export default Artisans;
