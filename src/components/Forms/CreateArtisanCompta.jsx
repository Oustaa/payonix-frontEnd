import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArtisanCompta } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";
import changeHandler from "../../utils/inputChangeHndler";

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
  const { token } = useSelector((state) => state.auth);

  const memoizedArtisans = useMemo(() => artisans, []);
  const { data: artisansData } = memoizedArtisans;

  const [inputs, setInputs] = useState(initialInputValues);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/artisans/comptas`,
        {
          ac_artisan_id: inputs.ac_artisan_id.value,
          ac_amount: inputs.ac_amount.value,
          ac_date: inputs.ac_date.value,
          ac_note: inputs.ac_note.value,
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

        dispatch(addArtisanCompta(response.data.item));
      }
    } catch (err) {
      setError(err);
      setMessage(err?.response?.data?.error_message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return setInputs({
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
    });
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        name="ac_artisan_id"
        label="Artisan Name:"
        value={inputs.ac_artisan_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
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
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.ac_amount.valid ? "invalid" : "")}
      />
      <Input
        name="ac_note"
        label="Note:"
        value={inputs.ac_note.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        name="ac_date"
        label="Date:"
        value={inputs.ac_date.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        type="date"
      />
      <Button bgColor="var(--primary-cyan-800)">
        {loading ? "adding" : "add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
