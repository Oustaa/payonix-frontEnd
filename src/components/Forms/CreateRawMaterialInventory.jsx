import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtisans } from "../../features/artisan-slice";
import {
  getMaterialsStock,
  addInventory,
} from "../../features/rawMaterial-slice";

import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";
import { StyledForm, Button } from "../../styles";

const CURRENT_DATE = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  rms_date_stock: {
    value: CURRENT_DATE,
    valid: true,
    focused: false,
  },
  rmi_raw_mat_stock_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_artisan_id: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  rmi_estimated_nbr_prod: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialInputValues);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { data: artisansData, loading: artisansLoading } = useSelector(
    (state) => state.artisans.artisans
  );
  const { data: materialStockData, loading: materialStockLoading } =
    useSelector((state) => state.materials.stock);

  useEffect(() => {
    if (artisansData.length === 0) dispatch(getArtisans());
    if (materialStockData.length === 0) dispatch(getMaterialsStock());

    return setInputs({
      rms_date_stock: {
        value: CURRENT_DATE,
        valid: true,
        focused: false,
      },
      rmi_raw_mat_stock_id: {
        value: "",
        valid: true,
        focused: false,
      },
      rmi_artisan_id: {
        value: "",
        valid: true,
        focused: false,
      },
      rmi_quantity: {
        value: "",
        valid: true,
        focused: false,
      },
      rmi_estimated_nbr_prod: {
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
    setLoading(true);
    try {
      const a_name = artisansData.find((artisan) => {
        return artisan.a_id === inputs.rmi_artisan_id.value;
      })?.a_name;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rawMaterials/inventory`,
        {
          rms_date_stock: inputs.rms_date_stock.value,
          rmi_raw_mat_stock_id: inputs.rmi_raw_mat_stock_id.value,
          rmi_artisan_id: inputs.rmi_artisan_id.value,
          rmi_quantity: inputs.rmi_quantity.value,
          rmi_estimated_nbr_prod: inputs.rmi_estimated_nbr_prod.value,
          a_name,
        },
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setMessage(response?.data?.message);
        setInputs(initialInputValues);
        setError(null);
        const { a_name } = artisansData.find(
          (atisan) => atisan.a_id === response?.data?.item.rmi_artisan_id
        );
        dispatch(addInventory({ ...response?.data?.item, a_name }));
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
        type="date"
        name="rms_date_stock"
        label="Inventory Date:"
        value={inputs.rms_date_stock.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Input
        type="select"
        data={artisansData}
        holders={["a_id", "a_name"]}
        name="rmi_artisan_id"
        label="Artisan Name:"
        value={inputs.rmi_artisan_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.rmi_artisan_id.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={materialStockData}
        holders={["rms_id", "rms_id"]}
        name="rmi_raw_mat_stock_id"
        label="Material stock SKU:"
        value={inputs.rmi_raw_mat_stock_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.rmi_raw_mat_stock_id.valid ? "invalid" : "")}
      />
      <Input
        type="number"
        name="rmi_quantity"
        label="Quantity:"
        value={inputs.rmi_quantity.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.rmi_quantity.valid ? "invalid" : "")}
      />
      <Input
        type="number"
        name="rmi_estimated_nbr_prod"
        label="Estimated Number of products:"
        value={inputs.rmi_estimated_nbr_prod.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Button bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProduct;
