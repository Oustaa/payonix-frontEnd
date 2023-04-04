import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBase } from "../../features/rawMaterial-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";
const initialInputValues = {
  rmb_name: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateRawMatBase = () => {
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
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/rawMaterials/bases`,
        { rmb_name: inputs.rmb_name.value },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        dispatch(addBase(response.data?.item));
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(error?.response?.data?.error_message);
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
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}

      <Input
        label="Raw material name:"
        name="rmb_name"
        value={inputs.rmb_name.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.rmb_name.valid ? "invalid" : "")}
      />
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateRawMatBase;
