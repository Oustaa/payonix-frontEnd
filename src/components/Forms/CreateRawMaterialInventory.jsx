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
  rmi_raw_mat_stock_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_artisan_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_estimated_nbr_prod: {
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
        `http://localhost:8000/api/rawMaterials/inventory`,
        {
          rms_date_stock: inputs.rms_date_stock.value,
          rmi_raw_mat_stock_id: inputs.rmi_raw_mat_stock_id.value,
          rmi_artisan_id: inputs.rmi_artisan_id.value,
          rmi_quantity: inputs.rmi_quantity.value,
          rmi_estimated_nbr_prod: inputs.rmi_estimated_nbr_prod.value,
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
        <label htmlFor="rms_date_stock">Inventory Date:</label>
        <input
          type="date"
          name="rms_date_stock"
          id="rms_date_stock"
          value={inputs.rms_date_stock.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rmi_artisan_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rmi_artisan_id">Artisan Name:</label>
        <input
          type="text"
          name="rmi_artisan_id"
          value={inputs.rmi_artisan_id.value}
          onChange={handleinputChange}
          id="rmi_artisan_id"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rmi_raw_mat_stock_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rmi_raw_mat_stock_id">Material type:</label>
        <input
          type="text"
          name="rmi_raw_mat_stock_id"
          value={inputs.rmi_raw_mat_stock_id.value}
          onChange={handleinputChange}
          id="rmi_raw_mat_stock_id"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rmi_quantity.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rmi_quantity">Quantity:</label>
        <input
          type="text"
          name="rmi_quantity"
          value={inputs.rmi_quantity.value}
          onChange={handleinputChange}
          id="rmi_quantity"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.rmi_estimated_nbr_prod.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="rmi_estimated_nbr_prod">
          Estimated Number of products:
        </label>
        <input
          type="text"
          name="rmi_estimated_nbr_prod"
          value={inputs.rmi_estimated_nbr_prod.value}
          onChange={handleinputChange}
          id="rmi_estimated_nbr_prod"
        />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;
