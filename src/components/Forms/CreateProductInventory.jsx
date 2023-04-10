import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsVariety,
  addProductInventory,
} from "../../features/products-slice";
import { getArtisans } from "../../features/artisan-slice";
import { getMaterialsInventory } from "../../features/rawMaterial-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";

const currentDate = new Date().toISOString().substring(0, 10);

const initialInputValues = {
  pi_date: {
    value: currentDate,
    valid: true,
    focused: false,
  },
  pi_quantity: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_unit_price: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_artisan_id: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_prod_id: {
    value: "",
    valid: true,
    focused: false,
  },
  pi_raw_mat_inv_id: {
    value: "",
    valid: true,
    focused: false,
  },
};

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialInputValues);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { data: dataVariety, loading: loadingVariety } = useSelector(
    (state) => state.products.varity
  );
  const { data: dataArtisan, loading: loadingArtisan } = useSelector(
    (state) => state.artisans.artisans
  );
  const { data: dataMaterialInventory, loading: loadingMaterialInventory } =
    useSelector((state) => state.materials.inventory);

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
    console.log(dataArtisan.length === 0);
    if (dataVariety.length === 0) dispatch(getProductsVariety({ token }));
    if (dataArtisan.length === 0) dispatch(getArtisans({ token }));
    if (dataMaterialInventory.length === 0)
      dispatch(getMaterialsInventory({ token }));

    return () => {
      setInputs({
        pi_date: {
          value: currentDate,
          valid: true,
          focused: false,
        },
        pi_quantity: {
          value: "",
          valid: true,
          focused: false,
        },
        pi_unit_price: {
          value: "",
          valid: true,
          focused: false,
        },
        pi_artisan_id: {
          value: "",
          valid: true,
          focused: false,
        },
        pi_prod_id: {
          value: "",
          valid: true,
          focused: false,
        },
        pi_raw_mat_inv_id: {
          value: "",
          valid: true,
          focused: false,
        },
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/inventory`,
        {
          pi_date: inputs.pi_date.value,
          pi_quantity: inputs.pi_quantity.value,
          pi_unit_price: inputs.pi_unit_price.value,
          pi_artisan_id: inputs.pi_artisan_id.value,
          pi_prod_id: inputs.pi_prod_id.value,
          pi_raw_mat_inv_id: inputs.pi_raw_mat_inv_id.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage(response?.data?.message);
        dispatch(addProductInventory(response.data?.item));
        setInputs(initialInputValues);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(err?.response?.data?.error_message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? (
        <p className={`message ${error ? "error" : ""}`}>{message}</p>
      ) : null}
      <Input
        type={"date"}
        name="pi_date"
        value={inputs.pi_date.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Inventory Date:"
      />
      <Input
        type="select"
        data={dataArtisan}
        holders={["a_id", "a_name"]}
        name="pi_artisan_id"
        label="Artisan name:"
        value={inputs.pi_artisan_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pi_artisan_id.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={dataVariety}
        holders={["p_id", "p_name"]}
        name="pi_prod_id"
        label="Product:"
        value={inputs.pi_prod_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pi_prod_id.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={dataMaterialInventory}
        holders={["rmi_id", "rmi_id"]}
        name="pi_raw_mat_inv_id"
        label="Material Inventory origin:"
        value={inputs.pi_raw_mat_inv_id.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pi_raw_mat_inv_id.valid ? "invalid" : "")}
      />
      <Input
        name="pi_quantity"
        label="Products quantity:"
        value={inputs.pi_quantity.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pi_quantity.valid ? "invalid" : "")}
      />
      <Input
        name="pi_unit_price"
        label="Unit Price:"
        value={inputs.pi_unit_price.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs.pi_unit_price.valid ? "invalid" : "")}
      />

      <Button bgColor="var(--primary-cyan-800)">Add</Button>
    </StyledForm>
  );
};

export default CreateProductForm;
