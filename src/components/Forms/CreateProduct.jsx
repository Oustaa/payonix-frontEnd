import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputGroup, StyledForm, Button } from "../../styles";

const initialInputValues = {
  p_name: {
    value: "",
    valid: true,
    focused: false,
  },
  p_raw_mat_base_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const [file, setFile] = useState(null);
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
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            p_name: inputs.p_name.value,
            p_raw_mat_base_id: inputs.p_raw_mat_base_id.value,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        setFile(null);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(error?.response?.data?.error_message);
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
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}

      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.p_name.valid ? "invalid" : ""}
      >
        <label htmlFor="p_name">Products name:</label>
        <input
          type="text"
          name="p_name"
          id="p_name"
          value={inputs.p_name.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup
        className={!inputs.p_raw_mat_base_id.valid ? "invalid" : ""}
        inputBgColor="var(--primary-dark-600)"
        inline={false}
      >
        <label htmlFor="p_raw_mat_base_id">Products Raw Material origin:</label>
        <input
          type="text"
          name="p_raw_mat_base_id"
          value={inputs.p_raw_mat_base_id.value}
          onChange={handleinputChange}
          id="p_raw_mat_base_id"
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

export default CreateProduct;
