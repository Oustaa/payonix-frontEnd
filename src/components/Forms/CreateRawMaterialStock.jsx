import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputGroup, StyledForm, Button } from "../../styles";

const CURRENT_DATE = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  rms_date_stock: {
    value: CURRENT_DATE,
    valid: true,
    focused: false,
  },
  rms_raw_mat_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rms_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  rms_unit_price: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
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
  }, [error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/rawMaterials/stock`,
        {
          rms_date_stock: inputs.rms_date_stock.value,
          rms_raw_mat_id: inputs.rms_raw_mat_id.value,
          rms_quantity: inputs.rms_quantity.value,
          rms_unit_price: inputs.rms_unit_price.value,
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
        className={!inputs.rms_date_stock.valid ? "invalid" : ""}
      >
        <label htmlFor="rms_date_stock">Material Stock date:</label>
        <input
          type="date"
          name="rms_date_stock"
          id="rms_date_stock"
          value={inputs.rms_date_stock.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rms_raw_mat_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rms_raw_mat_id">Material type:</label>
        <input
          type="text"
          name="rms_raw_mat_id"
          value={inputs.rms_raw_mat_id.value}
          onChange={handleinputChange}
          id="rms_raw_mat_id"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rms_quantity.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rms_quantity">Material Quantity:</label>
        <input
          type="text"
          name="rms_quantity"
          value={inputs.rms_quantity.value}
          onChange={handleinputChange}
          id="rms_quantity"
        />
      </InputGroup>{" "}
      <InputGroup
        className={!inputs.rms_unit_price.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rms_unit_price">Unit Price:</label>
        <input
          type="text"
          name="rms_unit_price"
          value={inputs.rms_unit_price.value}
          onChange={handleinputChange}
          id="rms_unit_price"
        />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;
