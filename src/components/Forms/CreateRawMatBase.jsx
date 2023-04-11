import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBase } from "../../features/rawMaterial-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";
import changeHandler from "../../utils/inputChangeHndler";

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
  }, [error]);

  useEffect(() => {
    return setInputs({
      rmb_name: {
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
        `${process.env.REACT_APP_BASE_URL}/rawMaterials/bases`,
        { rmb_name: inputs.rmb_name.value },
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        dispatch(addBase(response.data?.item));
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
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}

      <Input
        label="Raw material name:"
        name="rmb_name"
        value={inputs.rmb_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.rmb_name.valid ? "invalid" : "")}
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateRawMatBase;
