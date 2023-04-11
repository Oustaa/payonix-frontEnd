import React, { useEffect } from "react";
import { BsDashLg } from "react-icons/bs";
import {
  getMaterialsBase,
  getMaterialsTypes,
} from "../features/rawMaterial-slice";
import Table from "../components/table/Table";
import { FlexContainer, StyledTableAlert } from "../styles";
import { useSelector, useDispatch } from "react-redux";

const rawMaterialsHeaders = {
  "Raw material": { value: "rmb_name" },
  "Added at": { value: "rmd_added_at", type: "date" },
};

const rawMaterialsTypesHeaders = {
  "Raw Material origin": { value: "rmb_origin" },
  Name: { value: "rmt_name" },
  Description: {
    value: "rmt_description",
    default: true,
    defaultValue: <BsDashLg />,
  },
  Availability: {
    checked: true,
    check: (data) => {
      if (
        data["rmt_availability"] < data["rmt_reorder_point"] &&
        !Boolean(data["rmt_command_launched"])
      ) {
        return <StyledTableAlert>{data["rmt_availability"]}</StyledTableAlert>;
      }
      return data["rmt_availability"];
    },
  },
  "Reorder point": { value: "rmt_reorder_point" },
  "Command Launched": {
    checked: true,
    check: (data) => {
      if (
        data["rmt_availability"] < data["rmt_reorder_point"] &&
        !Boolean(data["rmt_command_launched"])
      ) {
        return <StyledTableAlert>Not yet!</StyledTableAlert>;
      }
      return <BsDashLg />;
    },
  },
};

const RawMaterials = () => {
  const dispatch = useDispatch();
  const { base, type } = useSelector((state) => state.materials);
  const { token } = useSelector((state) => state.auth);

  const {
    data: rawMaterialsData,
    loading: rawMaterialsLoading,
    error: rawMaterialsError,
  } = base;
  const {
    data: rawMaterialsTypesData,
    loading: rawMaterialsTypesLoading,
    error: rawMaterialsTypesError,
  } = type;

  useEffect(() => {
    if (rawMaterialsData.length === 0) dispatch(getMaterialsBase({ token }));
    if (rawMaterialsTypesData.length === 0)
      dispatch(getMaterialsTypes({ token }));
  }, []);

  return (
    <FlexContainer>
      <Table
        width="20%"
        headers={rawMaterialsHeaders}
        data={rawMaterialsData}
        loading={rawMaterialsLoading}
        error={rawMaterialsError}
        tableTitle="Raw materials:"
        componentName="rawMaterialBase"
        alertTitle="Create a new material base"
        endPoint="/rawMaterials/bases"
        id_name="rmb_id"
      />
      <Table
        width="80%"
        headers={rawMaterialsTypesHeaders}
        data={rawMaterialsTypesData}
        loading={rawMaterialsTypesLoading}
        error={rawMaterialsTypesError}
        tableTitle="Raw materials types:"
        filter={true}
        componentName="rawMaterialsTypes"
        alertTitle="Create a new material type"
        endPoint="/rawMaterials/types"
        id_name="rmt_id"
      />
    </FlexContainer>
  );
};

export default RawMaterials;
