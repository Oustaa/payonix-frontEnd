import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "../../features/ui-slice";
import { deletProducts } from "../../features/products-slice";
import styled from "styled-components";
import { Button } from "../../styles";
import axios from "axios";

const StyledDeletAlert = styled.div`
  color: var(--primary-dark-700);
  div {
    padding-top: var(--spacing-sm);
    display: flex;
    justify-content: space-around;
  }
`;

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Delete = () => {
  const { id, endPoint } = useSelector((state) => state.ui);
  const { token } = useSelector((state) => state.auth);
  const URL = `${BASE_URL}${endPoint}/${id}`;
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    const response = await axios.delete(URL, {
      headers: { authorization: token },
    });

    const data = response.data;

    if (data.deletionCount === 1) {
      dispatch(deletProducts({ id }));
      dispatch(closeAlert());
    }
  };

  return (
    <StyledDeletAlert>
      <h4>Are you sure, you want to delete item with id {id}</h4>
      <div>
        <Button
          onClick={deleteHandler}
          color="var(--white)"
          bgColor="var(--danger)"
        >
          Delete
        </Button>
        <Button
          color="var(--white)"
          bgColor="var(--primary-cyan-800)"
          onClick={() => dispatch(closeAlert())}
        >
          Cancel
        </Button>
      </div>
    </StyledDeletAlert>
  );
};

export default Delete;
