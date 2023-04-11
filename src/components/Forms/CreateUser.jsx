import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArtisan } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

import Input from "../Input";

const initialInputValues = {
  u_name: {
    value: "",
    valid: true,
    focused: false,
  },
  u_phone: {
    value: "",
    valid: true,
    focused: false,
  },
  u_email: {
    value: "",
    valid: true,
    focused: false,
  },
  u_password: {
    value: "",
    valid: true,
    focused: false,
  },
  u_role: {
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
    return () =>
      setInputs({
        u_name: {
          value: "",
          valid: true,
          focused: false,
        },
        u_phone: {
          value: "",
          valid: true,
          focused: false,
        },
        u_email: {
          value: "",
          valid: true,
          focused: false,
        },
        u_password: {
          value: "",
          valid: true,
          focused: false,
        },
        u_role: {
          value: "",
          valid: true,
          focused: false,
        },
      });
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
        `${process.env.REACT_APP_BASE_URL}/users`,
        {
          u_name: inputs.u_name.value,
          u_phone: inputs.u_phone.value,
          u_email: inputs.u_email.value,
          u_password: inputs.u_password.value,
          u_role: inputs.u_role.value,
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
        name="u_name"
        value={inputs.u_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="name:"
        className={() => {
          return !inputs.u_name.valid ? "invalid" : "";
        }}
      />
      <Input
        name="u_email"
        value={inputs.u_email.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Email:"
        className={() => {
          return !inputs.u_email.valid ? "invalid" : "";
        }}
      />
      <Input
        type={"password"}
        name="u_password"
        value={inputs.u_password.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Password:"
        className={() => {
          return !inputs.u_password.valid ? "invalid" : "";
        }}
      />
      <Input
        name="u_phone"
        value={inputs.u_phone.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Phone Number:"
      />
      <Input
        name="u_role"
        value={inputs.u_role.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Role:"
        type={"select"}
        data={[
          { role: "admin", name: "Admin" },
          { role: "user", name: "User" },
        ]}
        holders={["role", "name"]}
        className={() => {
          return !inputs.u_role.valid ? "invalid" : "";
        }}
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
