import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArtisan } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

import Input from "../Input";

const initialInputValues = {
  a_name: {
    value: "",
    valid: true,
    focused: false,
  },
  a_phone: {
    value: "",
    valid: true,
    focused: false,
  },
  a_address: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState(initialInputValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    return () => {
      setInputs({
        a_name: {
          value: "",
          valid: true,
          focused: false,
        },
        a_phone: {
          value: "",
          valid: true,
          focused: false,
        },
        a_address: {
          value: "",
          valid: true,
          focused: false,
        },
      });
    };
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/artisans`,
        {
          a_name: inputs.a_name.value,
          a_phone: inputs.a_phone.value,
          a_address: inputs.a_address.value,
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
        setMessage(response.data.message);
        setInputs(initialInputValues);
        dispatch(addArtisan(response.data.item));
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
        name="a_name"
        value={inputs.a_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisans Name:"
        className={() => {
          return !inputs.a_name.valid ? "invalid" : "";
        }}
      />
      <Input
        name="a_phone"
        value={inputs.a_phone.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisan Phone Number:"
      />
      <Input
        name="a_address"
        value={inputs.a_address.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisan Address:"
      />
      <Button bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
