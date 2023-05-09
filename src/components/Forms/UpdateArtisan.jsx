import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArtisan } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";

const UpdateArtisan = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.ui);
  const [inputs, setInputs] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const artisans = useSelector((state) => state.artisans.artisans);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

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
    const targetArtisan = artisans.data.find((artisan) => artisan.a_id === id);

    console.log(targetArtisan);
    setData(targetArtisan);

    if (data)
      setInputs({
        a_name: {
          value: data.a_name ? data.a_name : "",
          valid: true,
          focused: false,
        },
        a_phone: {
          value: data.a_phone ? data.a_phone : "",
          valid: true,
          focused: false,
        },
        a_address: {
          value: data.a_address ? data.a_address : "",
          valid: true,
          focused: false,
        },
        a_total: {
          value: data.a_total ? data.a_total : 0,
          valid: true,
          focused: false,
        },
      });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        a_id: id,
        a_name: inputs?.a_name?.value,
        a_phone: inputs?.a_phone?.value,
        a_address: inputs?.a_address?.value,
        a_total: inputs?.a_total?.value,
      };

      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/artisans/${id}`,
        newData,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setError(null);
        setMessage(response.data.message);
        dispatch(updateArtisan(newData));
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
        value={inputs?.a_name?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisans Name:"
      />
      <Input
        name="a_phone"
        value={inputs?.a_phone?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisan Phone Number:"
      />
      <Input
        name="a_address"
        value={inputs?.a_address?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisan Address:"
      />
      <Input
        type="number"
        name="a_total"
        value={inputs?.a_total?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Artisan Total:"
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Updating" : "Update"}
      </Button>
    </StyledForm>
  );
};

export default UpdateArtisan;
