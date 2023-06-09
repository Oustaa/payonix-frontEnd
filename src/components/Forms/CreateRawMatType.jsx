import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMaterialsBase, addType } from "../../features/rawMaterial-slice";
import Input from "../Input";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

const initialInputValues = {
  rmt_raw_mat_base_type: {
    value: "",
    valid: true,
    focused: false,
  },
  rmt_name: {
    value: "",
    valid: true,
    focused: false,
  },
  rmt_reorder_point: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateRawMatBase = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.materials.base);
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
    if (data.length === 0) dispatch(getMaterialsBase());
    return setInputs({
      rmt_raw_mat_base_type: {
        value: "",
        valid: true,
        focused: false,
      },
      rmt_name: {
        value: "",
        valid: true,
        focused: false,
      },
      rmt_reorder_point: {
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
        `${process.env.REACT_APP_BASE_URL}/rawMaterials/types`,
        {
          rmt_raw_mat_base_type: inputs.rmt_raw_mat_base_type.value,
          rmt_name: inputs.rmt_name.value,
          rmt_reorder_point: inputs.rmt_reorder_point.value,
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
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        dispatch(addType(response.data.item));
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
        label="Material base name:"
        className={() => (!inputs.rmt_name.valid ? "invalid" : "")}
        name="rmt_name"
        value={inputs.rmt_name.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        type="select"
        data={data}
        holders={["rmb_id", "rmb_name"]}
        label="Material Type name:"
        className={() => (!inputs.rmt_raw_mat_base_type.valid ? "invalid" : "")}
        name="rmt_raw_mat_base_type"
        value={inputs.rmt_raw_mat_base_type.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        label="Reorder point:"
        type="number"
        className={() => (!inputs.rmt_reorder_point.valid ? "invalid" : "")}
        name="rmt_reorder_point"
        value={inputs.rmt_reorder_point.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateRawMatBase;
