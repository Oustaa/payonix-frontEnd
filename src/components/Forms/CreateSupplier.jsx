import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSupplier } from "../../features/supplier-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

import Input from "../Input";

const initialInputValues = {
  s_name: {
    value: "",
    valid: true,
    focused: false,
  },
  s_phone: {
    value: "",
    valid: true,
    focused: false,
  },
  s_address: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialInputValues);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
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
    return setInputs({
      s_name: {
        value: "",
        valid: true,
        focused: false,
      },
      s_phone: {
        value: "",
        valid: true,
        focused: false,
      },
      s_address: {
        value: "",
        valid: true,
        focused: false,
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/suppliers`,
        {
          s_name: inputs.s_name.value,
          s_phone: inputs.s_phone.value,
          s_address: inputs.s_address.value,
        },
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 201) {
        setError(null);
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        dispatch(addSupplier(response?.data?.item));
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
        name="s_name"
        value={inputs.s_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Supplier Name:"
        className={() => {
          return !inputs.s_name.valid ? "invalid" : "";
        }}
      />
      <Input
        name="s_phone"
        value={inputs.s_phone.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Supplier Phone Number:"
      />
      <Input
        name="s_address"
        value={inputs.s_address.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Supplier Address:"
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
