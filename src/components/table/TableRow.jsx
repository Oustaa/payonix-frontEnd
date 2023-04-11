import React from "react";
import { useDispatch } from "react-redux";
import { openRightClickAlert } from "../../features/ui-slice";
import { StyledTr, StyledTd } from "../../styles/styled-table";
import DisplayebaleInput from "../ChangableValue";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100px;
  aspect-ratio: 1 / 0.8;
  object-fit: contain;
`;

const TableRow = ({ data, fields, id, endPoint, deletable, name }) => {
  const dispatch = useDispatch();

  const rightClickHandler = (e) => {
    e.preventDefault();
    const parent =
      e.target.parentNode.tagName === "TR"
        ? e.target.parentNode
        : e.target.parentNode.parentNode;

    const id = parent.dataset?.id;
    const x = e.clientX;
    const y = e.clientY;
    dispatch(
      openRightClickAlert({ cordinates: { x, y }, id, endPoint, deletable })
    );
    return false;
  };

  const displayedValues = fields.map((field, i) => {
    if (field.changable) {
      return (
        <StyledTd key={i}>
          <DisplayebaleInput
            url={field.url}
            type={field.inputType}
            value={data[field.value]}
            id={typeof field.id === "function" ? field.id(data) : ""}
            name={field.name}
          />
        </StyledTd>
      );
    } else if (field.type === "image")
      return (
        <StyledTd key={i} className="image">
          <StyledImage
            src={`${process.env.REACT_APP_BASE_URL}/images/${
              data[field.value]
            }`}
          />
        </StyledTd>
      );
    else if (field.type === "date")
      return (
        <StyledTd key={i}>
          {new Date(data[field.value]).toLocaleDateString()}
        </StyledTd>
      );
    else if (
      data[field.value] !== null &&
      data[field.value] !== undefined &&
      data[field.value] !== ""
    )
      return <StyledTd key={i}>{data[field.value]}</StyledTd>;
    else if (field.default)
      return <StyledTd key={i}>{field.defaultValue}</StyledTd>;
    else if (field.checked)
      return <StyledTd key={i}>{field.check(data, i)}</StyledTd>;
    else return <StyledTd key={i}>none</StyledTd>;
  });

  return (
    <>
      <StyledTr data-name={name} data-id={id} onContextMenu={rightClickHandler}>
        {displayedValues}
      </StyledTr>
    </>
  );
};

export default TableRow;
