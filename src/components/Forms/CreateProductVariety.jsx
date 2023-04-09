import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductVariety } from "../../features/products-slice";
import Input from "../Input";
import { InputGroup, StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

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
  const dispatch = useDispatch();
  const { data: productsData } = useSelector(
    (state) => state.products.products
  );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/variety`,
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
      if (response.status === 201) {
        setError(null);
        setMessage(response.data.message);
        setInputs(initialInputValues);
        dispatch(addProductVariety(response.data.item));
      }
    } catch (err) {
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
        label="Products Variety Name:"
        name="pv_name"
        value={inputs.pv_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pv_name.valid ? "invalid" : "")}
      />
      <Input
        label="Products origin:"
        name="pv_product_id"
        value={inputs.pv_product_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pv_product_id.valid ? "invalid" : "")}
        type="select"
        data={productsData}
        holders={["p_id", "p_name"]}
      />
      <Input
        label="Product Variety description:"
        name="pv_description"
        value={inputs.pv_description.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pv_description.valid ? "invalid" : "")}
      />
      <Input
        label="Reorder point:"
        name="pv_reorder_point"
        value={inputs.pv_reorder_point.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pv_reorder_point.valid ? "invalid" : "")}
      />

      <InputGroup>
        <label htmlFor="p_image">Products Image:</label>
        <input type="file" name="p_image" onChange={handleFileChange} />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Add</Button>
    </StyledForm>
  );
};

export default CreateProductForm;
