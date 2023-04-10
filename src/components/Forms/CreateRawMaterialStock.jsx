import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { StyledForm, Button } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getMaterialsTypes, addStock } from "../../features/rawMaterial-slice";
import changeHandler from "../../utils/inputChangeHndler";
const CURRENT_DATE = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  rms_date_stock: {
    value: CURRENT_DATE,
    valid: true,
    focused: false,
  },
  rms_raw_mat_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rms_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  rms_unit_price: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialInputValues);
  const { data, loading } = useSelector((state) => state.materials.type);
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
  }, [error, message]);

  useEffect(() => {
    if (data.length === 0) dispatch(getMaterialsTypes());

    return setInputs({
      rms_date_stock: {
        value: CURRENT_DATE,
        valid: true,
        focused: false,
      },
      rms_raw_mat_id: {
        value: "",
        valid: true,
        focused: false,
      },
      rms_quantity: {
        value: "",
        valid: true,
        focused: false,
      },
      rms_unit_price: {
        value: "",
        valid: true,
        focused: false,
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rawMaterials/stock`,
        {
          rms_date_stock: inputs.rms_date_stock.value,
          rms_raw_mat_id: inputs.rms_raw_mat_id.value,
          rms_quantity: inputs.rms_quantity.value,
          rms_unit_price: inputs.rms_unit_price.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        setError(null);
        dispatch(addStock(response.data.item));
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(err?.response?.data?.error_message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        type="date"
        name="rms_date_stock"
        label="Material Stock date:"
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        value={inputs.rms_date_stock.value}
      />
      <Input
        type="select"
        data={data}
        holders={["rmt_id", "rmt_name"]}
        name="rms_raw_mat_id"
        label="Material type:"
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        value={inputs.rms_raw_mat_id.value}
        className={() => (!inputs.rms_raw_mat_id.valid ? "invalid" : "")}
      />
      <Input
        type="number"
        name="rms_quantity"
        label="Material Quantity:"
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        value={inputs.rms_quantity.value}
        className={() => (!inputs.rms_quantity.valid ? "invalid" : "")}
      />
      <Input
        type="number"
        name="rms_unit_price"
        label="Unit Price:"
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        value={inputs.rms_unit_price.value}
        className={() => (!inputs.rms_unit_price.valid ? "invalid" : "")}
      />

      <Button bgColor="var(--primary-cyan-800)">Add</Button>
    </StyledForm>
  );
};

export default CreateProduct;
