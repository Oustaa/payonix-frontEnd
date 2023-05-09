import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArtisanCompta } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.ui);
  const [inputs, setInputs] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const {
    artisans_compta: artisansCompta,
    artisans: { data: artisansData },
  } = useSelector((state) => state.artisans);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const targetArtisanComta = artisansCompta.data.find(
      (artisanCompta) => artisanCompta.ac_id === id
    );

    console.log(targetArtisanComta);
    setData(targetArtisanComta);
    if (data)
      setInputs({
        ac_artisan_id: {
          value: data.ac_artisan_id ? data.ac_artisan_id : "",
          valid: true,
          focused: false,
        },
        ac_amount: {
          value: data.ac_amount ? data.ac_amount : 0,
          valid: true,
          focused: false,
        },
        ac_note: {
          value: data.ac_note ? data.ac_note : "",
          valid: true,
          focused: false,
        },
        ac_date: {
          value: data.ac_date
            ? new Date(data.ac_date).toISOString().substring(0, 10)
            : 0,
          valid: true,
          focused: false,
        },
      });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newData = {
      ac_id: id,
      ac_artisan_id: inputs?.ac_artisan_id?.value,
      ac_amount: inputs?.ac_amount?.value,
      ac_date: inputs?.ac_date?.value,
      ac_note: inputs?.ac_note?.value,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/artisans/comptas/${id}`,
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

        dispatch(updateArtisanCompta(newData));
      }
    } catch (err) {
      setError(err);
      setMessage(err?.response?.data?.error_message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading || !data) return <Loading />;

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message  ${error ? "error" : ""}`}>{message}</p>
      ) : null}

      <Input value={id} readOnly={true} />

      <Input
        name="ac_artisan_id"
        label="Artisan Name:"
        value={inputs?.ac_artisan_id?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        type={"select"}
        data={artisansData}
        holders={["a_id", "a_name"]}
        className={() => (!inputs?.ac_artisan_id?.valid ? "invalid" : "")}
      />
      <Input
        name="ac_amount"
        label="Amount:"
        type="number"
        value={inputs?.ac_amount?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.ac_amount?.valid ? "invalid" : "")}
      />
      <Input
        name="ac_note"
        label="Note:"
        value={inputs?.ac_note?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        name="ac_date"
        label="Date:"
        value={inputs?.ac_date?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        type="date"
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Updating" : "Update"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
