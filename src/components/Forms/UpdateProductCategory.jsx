import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCategory } from "../../features/products-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";

const CreateProductCategory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.ui);
  const [inputs, setInputs] = useState({});
  const categories = useSelector((state) => state.products.products);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

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
    const targetCategory = categories.data.find(
      (category) => category.pc_id === id
    );
    setData(targetCategory);

    if (data)
      setInputs({
        pc_name: {
          value: targetCategory?.pc_name,
          valid: true,
          focused: false,
        },
      });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        pc_id: id,
        pc_name: inputs.pc_name.value,
      };

      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/category/${id}`,
        newData,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        dispatch(updateProductCategory(newData));
        setError(null);
        setMessage(response?.data?.message);
      }
    } catch (err) {
      setError(err);
      setMessage(err?.response?.data?.error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        name="pc_name"
        label="Category name:"
        className={() => (!inputs?.pc_name?.valid ? "invalid" : "")}
        value={inputs?.pc_name?.value || ""}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Updating" : "Update"}
      </Button>
    </StyledForm>
  );
};

export default CreateProductCategory;
