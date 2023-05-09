import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsVariety,
  updateProductInventory,
} from "../../features/products-slice";
import { getArtisans } from "../../features/artisan-slice";
import { getMaterialsInventory } from "../../features/rawMaterial-slice";
import { StyledForm, Button } from "../../styles";
import changeHandler from "../../utils/inputChangeHndler";
import Input from "../Input";
// updateProductInventory
const CreateProductForm = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useSelector((state) => state.ui);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const {
    varity: { data: dataVariety },
    inventory: { data: dataInventory },
  } = useSelector((state) => state.products);
  const { data: dataArtisan } = useSelector((state) => state.artisans.artisans);
  const { data: dataMaterialInventory } = useSelector(
    (state) => state.materials.inventory
  );

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
    if (dataVariety.length === 0) dispatch(getProductsVariety({ token }));
    if (dataArtisan.length === 0) dispatch(getArtisans({ token }));
    if (dataMaterialInventory.length === 0)
      dispatch(getMaterialsInventory({ token }));

    console.log();

    const targetInventory = dataInventory.find(
      (artisanCompta) => artisanCompta.pi_id === id
    );

    console.log(targetInventory);
    setData(targetInventory);

    setInputs({
      pi_date: {
        value:
          new Date(targetInventory?.pi_date).toISOString().substring(0, 10) ||
          "",
        valid: true,
        focused: false,
      },
      pi_quantity: {
        value: targetInventory?.pi_quantity || "",
        valid: true,
        focused: false,
      },
      pi_unit_price: {
        value: targetInventory?.pi_unit_price || "",
        valid: true,
        focused: false,
      },
      pi_artisan_id: {
        value: targetInventory?.pi_artisan_id || "",
        valid: true,
        focused: false,
      },
      pi_prod_id: {
        value: targetInventory?.pi_prod_id || "",
        valid: true,
        focused: false,
      },
      pi_raw_mat_inv_id: {
        value: targetInventory?.pi_raw_mat_inv_id || "",
        valid: true,
        focused: false,
      },
    });
  }, [data, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      pi_id: data.pi_id,
      pi_date: inputs?.pi_date?.value,
      pi_quantity: inputs?.pi_quantity?.value,
      pi_unit_price: inputs?.pi_unit_price?.value,
      pi_artisan_id: inputs?.pi_artisan_id?.value,
      pi_prod_id: inputs?.pi_prod_id?.value,
      pi_raw_mat_inv_id: inputs?.pi_raw_mat_inv_id?.value,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/inventory/${id}`,
        newData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 201) {
        const vendor = dataArtisan.find(
          (artisan) => artisan.a_id === inputs?.pi_artisan_id?.value
        ).a_name;
        setMessage(response?.data?.message);
        dispatch(updateProductInventory({ ...newData, vendor }));
        setError(null);
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
        type={"date"}
        name="pi_date"
        value={inputs?.pi_date?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        label="Inventory Date:"
      />
      <Input
        type="select"
        data={dataArtisan}
        holders={["a_id", "a_name"]}
        name="pi_artisan_id"
        label="Artisan name:"
        value={inputs?.pi_artisan_id?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.pi_artisan_id?.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={dataVariety}
        holders={["p_id", "p_name"]}
        name="pi_prod_id"
        label="Product:"
        value={inputs?.pi_prod_id?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.pi_prod_id?.valid ? "invalid" : "")}
      />
      <Input
        name="pi_quantity"
        label="Products quantity:"
        value={inputs?.pi_quantity?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.pi_quantity?.valid ? "invalid" : "")}
      />
      <Input
        name="pi_unit_price"
        label="Unit Price:"
        value={inputs?.pi_unit_price?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
        className={() => (!inputs?.pi_unit_price?.valid ? "invalid" : "")}
      />
      <Input
        type="select"
        data={dataMaterialInventory}
        holders={["rmi_id", "rmi_id"]}
        name="pi_raw_mat_inv_id"
        label="Material Inventory origin:"
        value={inputs?.pi_raw_mat_inv_id?.value}
        onChangeHandler={(e) => changeHandler(e, setInputs)}
      />
      <Button mTop={true} bgColor="var(--primary-cyan-800)">
        {loading ? "Adding" : "Add"}
      </Button>
    </StyledForm>
  );
};

export default CreateProductForm;
