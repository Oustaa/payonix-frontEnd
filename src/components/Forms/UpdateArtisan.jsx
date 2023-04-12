import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArtisan } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Loading from "../Loading";
import Input from "../Input";

function getArtisan(data, id) {
  return new Promise(function (resolve, reject) {
    const artisan = data.find((artisan) => artisan.a_id === id);

    if (artisan) resolve(artisan);
    reject(new Error(`could not find artisan with the id ${id}`));
  });
}

async function test(data, id, successCallback, errorCallback, loadingCallback) {
  loadingCallback(true);
  try {
    const artsan = await getArtisan(data, id);
    successCallback(artsan);
  } catch (error) {
    errorCallback(error);
  } finally {
    loadingCallback(false);
  }
}

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
    test(artisans.data, id, setData, setError, setLoading);
  }, []);

  useEffect(() => {
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
        dispatch(addArtisan(response.data.item));
      }
    } catch (err) {
      setError(err);
      setMessage(err?.response?.data?.error_message);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) return <Loading />;

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input value={data.a_id} label="Artisans Id:" readOnly={true} />
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
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default UpdateArtisan;
