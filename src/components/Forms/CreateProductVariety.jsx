import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputGroup, StyledForm, Button } from "../../styles";

const initialInputValues = {
  pv_name: {
    value: "",
    valid: true,
    focused: false,
  },
  pv_description: {
    value: "",
    valid: true,
    focused: false,
  },
  pv_reorder_point: {
    value: "",
    valid: true,
    focused: false,
  },
  pv_product_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProductForm = () => {
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState(initialInputValues);
  const [error, setError] = useState(null);

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
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/products/variety`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            pv_name: inputs.pv_name.value,
            pv_description: inputs.pv_description.value,
            pv_reorder_point: inputs.pv_reorder_point.value,
            pv_product_id: inputs.pv_product_id.value,
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      {error?.response ? (
        <p className="error_message">{error?.response?.data?.error_message}</p>
      ) : null}
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.pv_name.valid ? "invalid" : ""}
      >
        <label htmlFor="pv_name">Products Variety Name:</label>
        <input
          type="text"
          name="pv_name"
          id="pv_name"
          value={inputs.pv_name.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pv_description.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pv_description">Product Variety description:</label>
        <input
          type="text"
          name="pv_description"
          value={inputs.pv_description.value}
          onChange={handleinputChange}
          id="pv_description"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pv_reorder_point.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pv_reorder_point">Reorder point:</label>
        <input
          type="text"
          name="pv_reorder_point"
          value={inputs.pv_reorder_point.value}
          onChange={handleinputChange}
          id="pv_reorder_point"
        />
      </InputGroup>
      <InputGroup
        className={!inputs.pv_product_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="pv_product_id">Products origin:</label>
        <input
          type="text"
          name="pv_product_id"
          value={inputs.pv_product_id.value}
          onChange={handleinputChange}
          id="pv_product_id"
        />
      </InputGroup>
      <InputGroup inputBgColor="var(--primary-dark-600)" inline={false}>
        <label htmlFor="p_image">Products Image:</label>
        <input type="file" name="p_image" onChange={handleFileChange} />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProductForm;
