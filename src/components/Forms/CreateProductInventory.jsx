import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputGroup, StyledForm, Button } from "../../styles";

const currentDate = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  pi_date: {
    value: currentDate,
    valid: true,
    focused: false,
  },
  pi_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_unit_price: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_artisan_id: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_prod_variant_id: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_raw_mat_inv_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProductForm = () => {
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
    console.log({
      pi_date: inputs.pi_date.value,
      pi_quantity: inputs.pi_quantity.value,
      pi_unit_price: inputs.pi_unit_price.value,
      pi_artisan_id: inputs.pi_artisan_id.value,
      pi_prod_variant_id: inputs.pi_prod_variant_id.value,
      pi_raw_mat_inv_id: inputs.pi_raw_mat_inv_id.value,
    });
    try {
      const response = await axios.post(
        `http://localhost:8000/api/products/inventory`,
        {
          pi_date: inputs.pi_date.value,
          pi_quantity: inputs.pi_quantity.value,
          pi_unit_price: inputs.pi_unit_price.value,
          pi_artisan_id: inputs.pi_artisan_id.value,
          pi_prod_variant_id: inputs.pi_prod_variant_id.value,
          pi_raw_mat_inv_id: inputs.pi_raw_mat_inv_id.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) setMessage(response?.data?.message);
      console.log(response);
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
      {message ? <p className={`message`}>{message}</p> : null}
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.pi_date.valid ? "invalid" : ""}
      >
        <label htmlFor="pi_date">Inventory Date:</label>
        <input
          type="date"
          name="pi_date"
          id="pi_date"
          value={inputs.pi_date.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pi_artisan_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pi_artisan_id">Artisan name:</label>
        <input
          type="text"
          name="pi_artisan_id"
          value={inputs.pi_artisan_id.value}
          onChange={handleinputChange}
          id="pi_artisan_id"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pi_quantity.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pi_quantity">Products quantity:</label>
        <input
          type="text"
          name="pi_quantity"
          value={inputs.pi_quantity.value}
          onChange={handleinputChange}
          id="pi_quantity"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pi_unit_price.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pi_unit_price">Unit Price:</label>
        <input
          type="text"
          name="pi_unit_price"
          value={inputs.pi_unit_price.value}
          onChange={handleinputChange}
          id="pi_unit_price"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pi_prod_variant_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pi_prod_variant_id">Product variety:</label>
        <input
          type="text"
          name="pi_prod_variant_id"
          value={inputs.pi_prod_variant_id.value}
          onChange={handleinputChange}
          id="pi_prod_variant_id"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pi_raw_mat_inv_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pi_raw_mat_inv_id">Product variety:</label>
        <input
          type="text"
          name="pi_raw_mat_inv_id"
          value={inputs.pi_raw_mat_inv_id.value}
          onChange={handleinputChange}
          id="pi_raw_mat_inv_id"
        />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProductForm;
