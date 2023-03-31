import React from "react";
import { InputGroup } from "../../styles";

const CreateProductForm = () => {
  return (
    <form>
      <InputGroup inline={true}>
        <label htmlFor="p_name">Products name</label>
        <input type="text" name="p_name" />
      </InputGroup>
    </form>
  );
};

export default CreateProductForm;
