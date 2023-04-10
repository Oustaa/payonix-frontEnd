import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductVariety } from "../../features/products-slice";
import Input from "../Input";
import { InputGroup, StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

const initialInputValues = {
  p_name: {
    value: "",
    valid: true,
    focused: false,
  },
  p_description: {
    value: "",
    valid: true,
    focused: false,
  },
  p_reorder_point: {
    value: "",
    valid: true,
    focused: false,
  },
  p_category: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { data: productsData } = useSelector(
    (state) => state.products.products
  );

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
      p_name: {
        value: "",
        valid: true,
        focused: false,
      },
      p_description: {
        value: "",
        valid: true,
        focused: false,
      },
      p_reorder_point: {
        value: "",
        valid: true,
        focused: false,
      },
      p_category: {
        value: "",
        valid: true,
        focused: false,
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
          params: {
            p_name: inputs.p_name.value,
            p_description: inputs.p_description.value,
            p_reorder_point: inputs.p_reorder_point.value,
            p_category: inputs.p_category.value,
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
        label="Product Name:"
        name="p_name"
        value={inputs.p_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.p_name.valid ? "invalid" : "")}
      />
      <Input
        label="Product Category:"
        name="p_category"
        value={inputs.p_category.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.p_category.valid ? "invalid" : "")}
        type="select"
        data={productsData}
        holders={["pc_id", "pc_name"]}
      />
      <Input
        label="Product description:"
        name="p_description"
        value={inputs.p_description.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.p_description.valid ? "invalid" : "")}
      />
      <Input
        label="Reorder point:"
        name="p_reorder_point"
        value={inputs.p_reorder_point.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.p_reorder_point.valid ? "invalid" : "")}
      />

      <InputGroup>
        <label htmlFor="p_image">Products Image:</label>
        <input type="file" name="p_image" onChange={handleFileChange} />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProductForm;
