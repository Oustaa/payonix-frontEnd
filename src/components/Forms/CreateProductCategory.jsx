import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/products-slice";
import { InputGroup, StyledForm, Button } from "../../styles";
import Input from "../Input";
import changeHandler from "../../utils/inputChangeHndler";

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

const CreateProductCategory = () => {
  const dispatch = useDispatch();
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
        `${process.env.REACT_APP_BASE_URL}/products`,
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
        dispatch(addProduct(response.data.item));
        setError(null);
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(err?.response?.data?.error_message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        name="p_name"
        label="Category name:"
        className={() => (!inputs.p_name.valid ? "invalid" : "")}
        value={inputs.p_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      {/* <Input
        name="p_raw_mat_base_id"
        label="Products Raw Material origin:"
        className={() => (!inputs.p_raw_mat_base_id.valid ? "invalid" : "")}
        value={inputs.p_raw_mat_base_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <InputGroup inputBgColor="var(--primary-dark-600)" inline={false}>
        <label htmlFor="p_image">Products Image:</label>
        <input type="file" name="p_image" onChange={handleFileChange} />
      </InputGroup> */}
      <Button bgColor="var(--primary-cyan-800)">Add</Button>
    </StyledForm>
  );
};

export default CreateProductCategory;
