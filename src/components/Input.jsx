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
  data,
  holders,
}) => {
  return (
    <InputGroup className={typeof className === "function" && className()}>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select name={name} id={name} value={value} onChange={onChangeHandler}>
          <option value="">--- Select ---</option>
          {data.map((data, i) => (
            <option key={i} value={data[holders[0]]}>
              {data[holders[1]]}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type || "text"}
          name={name}
          id={name}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      )}
    </InputGroup>
  );
};

export default Input;
