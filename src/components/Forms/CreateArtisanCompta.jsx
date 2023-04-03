import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArtisansCompta } from "../../features/artisan-slice";

import { InputGroup, StyledForm, Button } from "../../styles";

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
  const [inputs, setInputs] = useState(initialInputValues);

  const {
    artisans_compta: { error, status, loading },
  } = useSelector((state) => state.artisans);

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
    console.log(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      postArtisansCompta({
        data: {
          ac_artisan_id: inputs.ac_artisan_id.value,
          ac_amount: inputs.ac_amount.value,
          ac_date: inputs.ac_date.value,
          ac_note: inputs.ac_note.value,
        },
      })
    );
  };

  const handleinputChange = (e) => {
    const name = e.target.name;

    setInputs((prev) => {
      return {
        ...prev,
        [name]: { ...prev[name], value: e.target.value },
      };
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* {error ? (
        <p className={`message  ${error ? "error" : ""}`}>
          {error.response.data?.error_message}
        </p>
      ) : null} */}

      <InputGroup>
        <label htmlFor="ac_artisan_id">Artisan Name:</label>
        <input
          type="text"
          name="ac_artisan_id"
          value={inputs.ac_artisan_id.value}
          onChange={handleinputChange}
          id="ac_artisan_id"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="ac_amount">Amount:</label>
        <input
          type="text"
          name="ac_amount"
          value={inputs.ac_amount.value}
          onChange={handleinputChange}
          id="ac_amount"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="ac_note">Note:</label>
        <input
          type="text"
          name="ac_note"
          value={inputs.ac_note.value}
          onChange={handleinputChange}
          id="ac_note"
        />
      </InputGroup>
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.ac_date.valid ? "invalid" : ""}
      >
        <label htmlFor="ac_date">Date:</label>
        <input
          type="date"
          name="ac_date"
          id="ac_date"
          value={inputs.ac_date.value}
          onChange={handleinputChange}
        />
      </InputGroup>

      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;
