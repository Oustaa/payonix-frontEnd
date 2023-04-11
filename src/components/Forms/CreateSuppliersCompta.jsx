import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSupplierCompta } from "../../features/supplier-slice";
import { StyledForm, Button } from "../../styles";
import Input from "../Input";
import changeHandler from "../../utils/inputChangeHndler";

const CURRENT_DATE = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  sc_date: {
    value: CURRENT_DATE,
    valid: true,
    focused: false,
  },
  sc_amount: {
    value: "",
    valid: true,
    focused: false,
  },
  sc_note: {
    value: "",
    valid: true,
    focused: false,
  },
  sc_supplier_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateSupplierCompta = () => {
  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.suppliers);
  const memoizedSuppliers = useMemo(() => suppliers, []);
  const { data: artisansData } = memoizedSuppliers;
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    return setInputs({
      sc_date: {
        value: CURRENT_DATE,
        valid: true,
        focused: false,
      },
      sc_amount: {
        value: "",
        valid: true,
        focused: false,
      },
      sc_note: {
        value: "",
        valid: true,
        focused: false,
      },
      sc_supplier_id: {
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
        `${process.env.REACT_APP_BASE_URL}/suppliers/comptas`,
        {
          sc_supplier_id: inputs.sc_supplier_id.value,
          sc_amount: inputs.sc_amount.value,
          sc_date: inputs.sc_date.value,
          sc_note: inputs.sc_note.value,
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
        setMessage("Artisans compta was added successfully");
        setInputs(initialInputValues);
        dispatch(
          addSupplierCompta({
            ...response.data,
          })
        );
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
        name="sc_supplier_id"
        label="Supplier Name:"
        value={inputs.sc_supplier_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        type={"select"}
        data={artisansData}
        holders={["s_id", "s_name"]}
        className={() => (!inputs.sc_supplier_id.valid ? "invalid" : "")}
      />
      <Input
        name="sc_amount"
        label="Amount:"
        type="number"
        value={inputs.sc_amount.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.sc_amount.valid ? "invalid" : "")}
      />
      <Input
        name="sc_note"
        label="Note:"
        value={inputs.sc_note.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        name="sc_date"
        label="Date:"
        value={inputs.sc_date.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        type="date"
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateSupplierCompta;
