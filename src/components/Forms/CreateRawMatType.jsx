import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputGroup, StyledForm, Button } from "../../styles";

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
        [name]: { ...prev[name], value: e.target.value },
      };
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.rmt_raw_mat_base_type.valid ? "invalid" : ""}
      >
        <label htmlFor="rmt_raw_mat_base_type">material base name:</label>
        <input
          type="text"
          name="rmt_raw_mat_base_type"
          id="rmt_raw_mat_base_type"
          value={inputs.rmt_raw_mat_base_type.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.rmt_name.valid ? "invalid" : ""}
      >
        <label htmlFor="rmt_name">material Type name:</label>
        <input
          type="text"
          name="rmt_name"
          id="rmt_name"
          value={inputs.rmt_name.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.rmt_reorder_point.valid ? "invalid" : ""}
      >
        <label htmlFor="rmt_reorder_point">Reorder point:</label>
        <input
          type="text"
          name="rmt_reorder_point"
          id="rmt_reorder_point"
          value={inputs.rmt_reorder_point.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateRawMatBase;
