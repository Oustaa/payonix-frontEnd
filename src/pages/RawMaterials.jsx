import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";
import { BsDashLg } from "react-icons/bs";
import Table from "../components/table/Table";
import { FlexContainer, StyledTableAlert } from "../styles";

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
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const token = cookies.access_token;
  const {
    data: rawMaterialsData,
    loading: rawMaterialsLoading,
    error: rawMaterialsError,
  } = useFetch({
    url: "http://localhost:8000/api/rawMaterials/bases",
    config: {
      method: "GET",
      headers: {
        authorization: token,
      },
    },
  });
  const {
    data: rawMaterialsTypesData,
    loading: rawMaterialsTypesLoading,
    error: rawMaterialsTypesError,
  } = useFetch({
    url: "http://localhost:8000/api/rawMaterials/types",
    config: {
      method: "GET",
      headers: {
        authorization: token,
      },
    },
  });

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
      />
    </FlexContainer>
  );
};

export default RawMaterials;
