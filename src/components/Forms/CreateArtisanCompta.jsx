import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArtisanCompta } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";

const CURRENT_DATE = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  ac_date: {
    value: CURRENT_DATE,
    valid: true,
    focused: false,
  },
  ac_amount: {
    value: "",
    valid: true,
    focused: false,
  },
  ac_note: {
    value: "",
    valid: true,
    focused: false,
  },
  ac_artisan_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { artisans } = useSelector((state) => state.artisans);
  const memoizedArtisans = useMemo(() => artisans, []);
  const { data: artisansData } = memoizedArtisans;

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
  }, [error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/artisans/comptas`,
        {
          ac_artisan_id: inputs.ac_artisan_id.value,
          ac_amount: inputs.ac_amount.value,
          ac_date: inputs.ac_date.value,
          ac_note: inputs.ac_note.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setError(null);
        setMessage("Artisans compta was added successfully");
        setInputs(initialInputValues);
        console.log(response);
        dispatch(
          addArtisanCompta({
            ...response.data,
          })
        );
      }
    } catch (err) {
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
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        name="ac_artisan_id"
        label="Artisan Name:"
        value={inputs.ac_artisan_id.value}
        onChangeHandler={handleinputChange}
        type={"select"}
        data={artisansData}
        holders={["a_id", "a_name"]}
        className={() => (!inputs.ac_artisan_id.valid ? "invalid" : "")}
      />
      <Input
        name="ac_amount"
        label="Amount:"
        type="number"
        value={inputs.ac_amount.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.ac_amount.valid ? "invalid" : "")}
      />
      <Input
        name="ac_note"
        label="Note:"
        value={inputs.ac_note.value}
        onChangeHandler={handleinputChange}
      />
      <Input
        name="ac_date"
        label="Date:"
        value={inputs.ac_date.value}
        onChangeHandler={handleinputChange}
        type="date"
      />
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;