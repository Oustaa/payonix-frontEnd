import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { getProductsVariety } from "../../features/products-slice";
import { getArtisans } from "../../features/artisan-slice";
import { StyledForm, Button } from "../../styles";

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
  pi_prod_variant_id: {
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
  const { data: dataVariety, loading: loadingVariety } = useSelector(
    (state) => state.products.varity
  );
  const { data: dataArtisan, loading: loadingArtisan } = useSelector(
    (state) => state.artisans.artisans
  );
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
  }, [error, message]);

  useEffect(() => {
    if (dataVariety.length === 0) dispatch(getProductsVariety());
    if (dataArtisan.length === 0) dispatch(getArtisans());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      pi_date: inputs.pi_date.value,
      pi_quantity: inputs.pi_quantity.value,
      pi_unit_price: inputs.pi_unit_price.value,
      pi_artisan_id: inputs.pi_artisan_id.value,
      pi_prod_variant_id: inputs.pi_prod_variant_id.value,
      pi_raw_mat_inv_id: inputs.pi_raw_mat_inv_id.value,
    });
    try {
      const response = await axios.post(
        `http://localhost:8000/api/products/inventory`,
        {
          pi_date: inputs.pi_date.value,
          pi_quantity: inputs.pi_quantity.value,
          pi_unit_price: inputs.pi_unit_price.value,
          pi_artisan_id: inputs.pi_artisan_id.value,
          pi_prod_variant_id: inputs.pi_prod_variant_id.value,
          pi_raw_mat_inv_id: inputs.pi_raw_mat_inv_id.value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) setMessage(response?.data?.message);
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err);
      setMessage(error?.response?.data?.error_message);
    }
  };

  const handleinputChange = (e) => {
    const name = e.target.name;

    setInputs((prev) => {
      return {
        ...prev,
        [name]: { ...prev[name], value: e.target.value, valid: true },
      };
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message ? <p className={`message`}>{message}</p> : null}
      <Input
        type={"date"}
        name="pi_date"
        value={inputs.pi_date.value}
        onChangeHandler={handleinputChange}
        label="Inventory Date:"
      />
      <Input
        type="select"
        data={dataArtisan}
        holders={["a_id", "a_name"]}
        name="pi_artisan_id"
        label="Artisan name:"
        value={inputs.pi_artisan_id.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.pi_artisan_id.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={dataVariety}
        holders={["pv_id", "pv_name"]}
        name="pi_prod_variant_id"
        label="Product variety:"
        value={inputs.pi_prod_variant_id.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.pi_prod_variant_id.valid ? "invalid" : "")}
      />
      <Input
        name="pi_raw_mat_inv_id"
        label="Material Inventory origin:"
        value={inputs.pi_raw_mat_inv_id.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.pi_raw_mat_inv_id.valid ? "invalid" : "")}
      />
      <Input
        name="pi_quantity"
        label="Products quantity:"
        value={inputs.pi_quantity.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.pi_quantity.valid ? "invalid" : "")}
      />
      <Input
        name="pi_unit_price"
        label="Unit Price:"
        value={inputs.pi_unit_price.value}
        onChangeHandler={handleinputChange}
        className={() => (!inputs.pi_unit_price.valid ? "invalid" : "")}
      />

      <Button bgColor="var(--primary-cyan-800)">Create</Button>
    </StyledForm>
  );
};

export default CreateProductForm;
