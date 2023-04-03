import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postArtisans } from "../../features/artisan-slice";
import { InputGroup, StyledForm, Button } from "../../styles";

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

  // useEffect(() => {
  //   if (error?.response?.status === 400) {
  //     const missingFields = error.response.data?.missing_field || [];
  //     const updatedInputs = { ...inputs };
  //     for (const missingField of missingFields) {
  //       console.log(missingField);
  //       if (Boolean(missingField) && updatedInputs[missingField]) {
  //         updatedInputs[missingField].valid = false;
  //       }
  //     }
  //     setInputs(updatedInputs);
  //   }
  // }, [error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      postArtisans({
        data: {
          a_name: inputs.a_name.value,
          a_phone: inputs.a_phone.value,
          a_address: inputs.a_address.value,
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
      {/* {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null} */}
      <InputGroup
        inputBgColor="var(--primary-dark-600)"
        inline={false}
        className={!inputs.a_name.valid ? "invalid" : ""}
      >
        <label htmlFor="a_name">Artisans Name:</label>
        <input
          type="text"
          name="a_name"
          id="a_name"
          value={inputs.a_name.value}
          onChange={handleinputChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="a_phone">Artisan Phone Number:</label>
        <input
          type="text"
          name="a_phone"
          value={inputs.a_phone.value}
          onChange={handleinputChange}
          id="a_phone"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="a_address">Artisan Address:</label>
        <input
          type="text"
          name="a_address"
          value={inputs.a_address.value}
          onChange={handleinputChange}
          id="a_address"
        />
      </InputGroup>
      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProduct;
