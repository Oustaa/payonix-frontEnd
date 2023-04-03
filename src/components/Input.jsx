import React from "react";
import { InputGroup } from "../styles";
const Input = ({
  type,
  value,
  onChangeHandler,
  placeholder,
  name,
  label,
  className,
}) => {
  return (
    <InputGroup className={typeof className === "function" && className()}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || "text"}
        name={name}
        id={name}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};

export default Input;
