import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/products-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";
import changeHandler from "../../utils/inputChangeHndler";

const initialInputValues = {
  pc_name: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProductCategory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState(initialInputValues);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (error?.response?.status === 400) {
      const missingFields = error.response.data?.missing_field || [];
      const updatedInputs = { ...inputs };
      for (const missingField of missingFields) {
        if (Boolean(missingField) && updatedInputs[missingField]) {
          updatedInputs[missingField].valid = false;
        }
      }
      setInputs(updatedInputs);
    }
  }, [error]);

  useEffect(() => {
    return setInputs({
      pc_name: {
        value: "",
        valid: true,
        focused: false,
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
          params: {
            pc_name: inputs.pc_name.value,
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
      setError(err);
      setMessage(err?.response?.data?.error_message);
    } finally {
      setLoading(false);
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
        name="pc_name"
        label="Category name:"
        className={() => (!inputs.pc_name.valid ? "invalid" : "")}
        value={inputs.pc_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Button bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProductCategory;
