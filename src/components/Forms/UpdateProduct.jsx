import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCategory } from "../../features/products-slice";
import {
  StyledForm,
  Button,
  StyledPreviewImage,
  InputGroup,
} from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.ui);
  const [inputs, setInputs] = useState({});
  const { varity: products, products: categories } = useSelector(
    (state) => state.products
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

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
    const targetProduct = products.data.find(
      (category) => category.p_id === id
    );
    console.log(targetProduct);
    setData(targetProduct);
    setPreviewURL(
      `${process.env.REACT_APP_BASE_URL}/images/${targetProduct.p_image}`
    );

    setInputs({
      p_name: {
        value: data?.p_name,
        valid: true,
        focused: false,
      },
      p_description: {
        value: data?.p_description,
        valid: true,
        focused: false,
      },
      p_reorder_point: {
        value: data?.p_reorder_point,
        valid: true,
        focused: false,
      },
      p_category: {
        value: data?.p_category,
        valid: true,
        focused: false,
      },
    });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("p_name", inputs?.p_name.value);
    formData.append("p_description", inputs?.p_description.value);
    formData.append("p_reorder_point", inputs?.p_reorder_point.value);
    formData.append("p_category", inputs?.p_category.value);
    formData.append("p_id", id);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      if (response.status === 201) {
        setError(null);
        setMessage(response.data.message);
        // setInputs(initialInputValues);
        // dispatch(addProductVariety(response.data.item));
        setFile(null);
        // setPreviewURL(null);
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
    setPreviewURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        label="Product Name:"
        name="p_name"
        value={inputs?.p_name?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.p_name?.valid ? "invalid" : "")}
      />
      <Input
        label="Product Category:"
        name="p_category"
        value={inputs?.p_category?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.p_category?.valid ? "invalid" : "")}
        type="select"
        data={categories.data}
        holders={["pc_id", "pc_name"]}
      />
      <Input
        label="Product description:"
        name="p_description"
        value={inputs?.p_description?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.p_description?.valid ? "invalid" : "")}
      />
      <Input
        label="Reorder point:"
        name="p_reorder_point"
        value={inputs?.p_reorder_point?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.p_reorder_point?.valid ? "invalid" : "")}
      />
      {previewURL && <StyledPreviewImage src={previewURL} alt="" />}
      <InputGroup>
        <label htmlFor="p_image">Products Image:</label>
        <input type="file" name="p_image" onChange={handleFileChange} />
      </InputGroup>
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Updating" : "Update"}
      </Button>
    </StyledForm>
  );
};

export default CreateProductForm;
