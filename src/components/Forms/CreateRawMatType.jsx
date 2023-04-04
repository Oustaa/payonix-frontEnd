import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMaterialsBase, addType } from "../../features/rawMaterial-slice";
import Input from "../Input";
import { StyledForm, Button } from "../../styles";

const initialInputValues = {
  rmt_raw_mat_base_type: {
    value: "",
    valid: true,
    focused: false,
  },
  rmt_name: {
    value: "",
    valid: true,
    focused: false,
  },
  rmt_reorder_point: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateRawMatBase = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.materials.base);
  const [inputs, setInputs] = useState(initialInputValues);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (error?.response?.status === 400) {
      const missingFields = error.response.data?.missing_field || [];
      const updatedInputs = { ...inputs };
      for (const missingField of missingFields) {
        console.log(missingField);
        if (Boolean(missingField) && updatedInputs[missingField]) {
          updatedInputs[missingField].valid = false;
        }
      }
      setInputs(updatedInputs);
    }
  }, [error]);

  useEffect(() => {
    if (data.length === 0) dispatch(getMaterialsBase());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/rawMaterials/types`,
        {
          rmt_raw_mat_base_type: inputs.rmt_raw_mat_base_type.value,
          rmt_name: inputs.rmt_name.value,
          rmt_reorder_point: inputs.rmt_reorder_point.value,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        dispatch(addType(response.data.item));
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(error?.response?.data?.error_message);
    }
  };

  const handleinputChange = (e) => {
    const name = e.target.name;

    setInputs((prev) => {
      return {
        ...prev,
        [name]: { ...prev[name], value: e.target.value, valid: true },
      };
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        label="Material base name:"
        className={() => (!inputs.rmt_name.valid ? "invalid" : "")}
        name="rmt_name"
        value={inputs.rmt_name.value}
        onChangeHandler={handleinputChange}
      />
      <Input
        type="select"
        data={data}
        holders={["rmb_id", "rmb_name"]}
        label="Material Type name:"
        className={() => (!inputs.rmt_raw_mat_base_type.valid ? "invalid" : "")}
        name="rmt_raw_mat_base_type"
        value={inputs.rmt_raw_mat_base_type.value}
        onChangeHandler={handleinputChange}
      />
      <Input
        label="Reorder point:"
        type="number"
        className={() => (!inputs.rmt_reorder_point.valid ? "invalid" : "")}
        name="rmt_reorder_point"
        value={inputs.rmt_reorder_point.value}
        onChangeHandler={handleinputChange}
      />
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateRawMatBase;
