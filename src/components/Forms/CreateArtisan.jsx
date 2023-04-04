import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addArtisan } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
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
  }, [error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/artisans`,
        {
          a_name: inputs.a_name.value,
          a_phone: inputs.a_phone.value,
          a_address: inputs.a_address.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setError(null);
        setMessage(
          `Artisan with the name '${response.data.a_name}' has been created`
        );
        setInputs(initialInputValues);
        dispatch(addArtisan(response.data));
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(err?.response?.data?.error_message);
    }
  };

  const handleinputChange = (e) => {
    const name = e.target.name;

    setInputs((prev) => {
      return {
        ...prev,
        [name]: { ...prev[name], value: e.target.value, valid: true },
      };
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        name="a_name"
        value={inputs.a_name.value}
        onChangeHandler={handleinputChange}
        label="Artisans Name:"
        className={() => {
          return !inputs.a_name.valid ? "invalid" : "";
        }}
      />
      <Input
        name="a_phone"
        value={inputs.a_phone.value}
        onChangeHandler={handleinputChange}
        label="Artisan Phone Number:"
      />
      <Input
        name="a_address"
        value={inputs.a_address.value}
        onChangeHandler={handleinputChange}
        label="Artisan Address:"
      />
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;
