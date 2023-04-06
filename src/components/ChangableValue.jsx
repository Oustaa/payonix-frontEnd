import React, { useState } from "react";
import axios from "axios";
import Input from "./Input";
import { Button, FlexContainer } from "../styles";
import { useEffect } from "react";

const DisplayebaleInput = ({ value, type, url, id, name }) => {
  const [updating, setUpdating] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(value);
  const [urlValue, setUrlValue] = useState("");
  useEffect(() => {
    setUrlValue(`${url}/${id}`);
  }, [url, id]);

  const dbClickHandler = () => {
    setUpdating(true);
  };

  const changeHandler = (e) => {
    setDisplayedValue(e.target.value);
  };

  const submitHandler = (e) => {
    console.log(url, id);

    e.preventDefault();
    axios
      .put(
        urlValue,
        {
          [name]: Number(displayedValue),
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        setUpdating(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inLineForm = (
    <form onSubmit={submitHandler}>
      <FlexContainer x="center" y="center">
        <Input
          type={type}
          onChangeHandler={changeHandler}
          value={displayedValue}
        />
        <Button
          padding="var(--spacing-xsm)"
          bgColor="var(--primary-cyan-800)"
          color="var(--white)"
        >
          Update
        </Button>
      </FlexContainer>
    </form>
  );

  return (
    <span onDoubleClick={dbClickHandler}>
      {updating ? inLineForm : displayedValue}
    </span>
  );
};

export default DisplayebaleInput;
